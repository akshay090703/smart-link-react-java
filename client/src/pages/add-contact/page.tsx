import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './_components/ImageUpload';
import { ContactFormFields } from './_components/ContactFormFields';
import { apiClient } from '../../lib/api-client';
import toast from 'react-hot-toast';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    website: string;
    socialLink: string;
    isFavorite: boolean;
    profilePhoto: File | null
}

const defaultImage = "https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png"

const initialFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    website: '',
    socialLink: '',
    isFavorite: false,
    profilePhoto: null
};

const AddContactPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [photo, setPhoto] = useState<string | File>(defaultImage);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        const phoneRegex = /^\d{8,}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Valid phone number is required (min 8 digits)';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
            newErrors.website = 'Valid website URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const dataToSend = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                dataToSend.append(key, value);
            })

            const res = await apiClient.post("/user/contacts/add", dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res);
            toast.success("Contact successfully created!")

            handleReset()
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (photo instanceof File) {
            setFormData(prev => ({ ...prev, profilePhoto: photo }));
        }
    }, [photo])

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const maxSizeInBytes = 7 * 1024 * 1024; // 7 MB
            if (file.size > maxSizeInBytes) {
                toast.error("Photo size should be less than 7 MB");
                return;
            }

            setPhoto(file);
        }
    };

    const handleFieldChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setPhoto(defaultImage);
        setErrors({});
    };

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="bg-card rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8">Add New Contact</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <ImageUpload
                                imageUrl={photo}
                                onImageChange={handleImageChange}
                            />
                        </div>

                        <div className="flex-grow">
                            <ContactFormFields
                                formData={formData}
                                errors={errors}
                                onChange={handleFieldChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            Reset
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Contact
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddContactPage