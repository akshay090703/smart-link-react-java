import { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FloatingLabel, FloatingInput } from '@/components/FloatingInput';
import { FloatingLabelForTextArea, FloatingTextarea } from '@/components/FloatingTextarea';
import { useProfile } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { initialData, ProfileForm, ValidationErrors } from './types';
import { apiClient } from '../../lib/api-client';

function ProfilePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ProfileForm>(initialData);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { userProfile, setUserProfile } = useProfile();

    const [previewPhoto, setPreviewPhoto] = useState(userProfile?.profilePic)
    // const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        if (userProfile) {
            setFormData({
                name: userProfile?.name,
                email: userProfile?.email,
                phoneNumber: userProfile?.phoneNumber,
                about: userProfile?.about,
                profileImage: null
            })

            setPreviewPhoto(userProfile?.profilePic)
        }
    }, [userProfile])

    function isInteger(value: string) {
        if (parseInt(value, 10).toString() === value) {
            return true
        }
        return false;
    }

    const validateForm = (): boolean => {
        const newErrors: { name: string; email: string; about: string; phoneNumber: string; } = {
            name: "",
            email: "",
            phoneNumber: "",
            about: "",
        };

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.phoneNumber || formData.phoneNumber.length < 8 || !isInteger(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be number of at least 10 digits';
        }

        if (!formData.about || formData.about.length < 10) {
            newErrors.about = 'About must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const dataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key == "profileImage" && value == null) {

            } else {
                dataToSend.append(key, value);
            }
        })
        // console.log('Form data:', dataToSend);

        setIsLoading(true);
        try {
            const res = await apiClient.put('/user/update/' + userProfile?.id, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            if (res.status === 200) {
                toast.success("Profile successfully updated!")
                setUserProfile(res?.data);
                navigate('/dashboard')
            }

            if (res.status === 401) {
                toast.error("Unauthorized user!")
                navigate('/auth')
            }
        } catch (error) {
            toast.error("There was some error updating the profile!")
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        const newErrors = { ...errors };

        switch (name) {
            case 'name':
                newErrors.name = value.length >= 2 ? '' : 'Name must be at least 2 characters';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                newErrors.email = emailRegex.test(value) ? '' : 'Invalid email address';
                break;
            case 'phoneNumber':
                newErrors.phoneNumber = value.length >= 8 && isInteger(value) ? '' : 'Phone number must be at least 8 digits';
                break;
            case 'about':
                newErrors.about = value.length >= 10 ? '' : 'About must be at least 10 characters';
                break;
            default:
                break;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors(newErrors);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 7 * 1024 * 1024) {
                toast.error("The profile image should be less than 7MB")
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, profileImage: file })
            setPreviewPhoto(imageUrl);
        }
    };

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate('/dashboard')}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>

            <div className="bg-card rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Image Section */}
                        <div className="flex-shrink-0">
                            <div className="relative w-48 h-48 group">
                                <img
                                    src={previewPhoto}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                                <div
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                    <Plus className="h-12 w-12 text-white" />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* Form Fields Section */}
                        <div className="flex-grow space-y-6">
                            <div className="space-y-2">
                                <div className="relative">
                                    <FloatingLabel htmlFor="name">Name</FloatingLabel>
                                    <FloatingInput
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={cn(errors.name && 'border-destructive')}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <FloatingLabel htmlFor="email">Email</FloatingLabel>
                                    <FloatingInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        disabled={true}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={cn(errors.email && 'border-destructive')}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <FloatingLabel htmlFor="phoneNumber">Phone Number</FloatingLabel>
                                    <FloatingInput
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={cn(errors.phoneNumber && 'border-destructive')}
                                        type='tel'
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="text-sm text-destructive">{errors.phoneNumber}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <FloatingLabelForTextArea htmlFor="about">About</FloatingLabelForTextArea>
                                    <FloatingTextarea
                                        id="about"
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        className={cn('min-h-[100px]', errors.about && 'border-destructive')}
                                    />
                                </div>
                                {errors.about && (
                                    <p className="text-sm text-destructive">{errors.about}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage