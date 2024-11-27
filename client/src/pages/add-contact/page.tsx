import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './_components/ImageUpload';
import { ContactFormFields } from './_components/ContactFormFields';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    website: string;
    socialLink: string;
    isFavorite: boolean;
}

const initialFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    website: '',
    socialLink: '',
    isFavorite: false,
};

const defaultImage = "https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png"

const AddContactPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [profileImage, setProfileImage] = useState(defaultImage);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Valid phone number is required (min 10 digits)';
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', { ...formData, profileImage });
            // Reset form after successful submission
            setFormData(initialFormData);
            setProfileImage('/placeholder-avatar.jpg');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
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
        setProfileImage(defaultImage);
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
                                imageUrl={profileImage}
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