import { useState } from 'react';
import { FormField } from './FormField';
import { validateForm } from './validation';
import { FormErrors, ContactFormData } from './types';
import { LoadingButton } from '@/components/LoadingButton';

interface ContactFormProps {
    formData: ContactFormData;
    disabled?: boolean;
    onSubmit: (formData: ContactFormData) => Promise<void>
    setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>
    loading: boolean
}

export function ContactForm({ formData, setFormData, disabled, onSubmit, loading }: ContactFormProps) {
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(newErrors);
        }
    };

    const handleChange = (field: keyof ContactFormData) => (value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative space-y-2">
            <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange('name')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="Address"
                name="address"
                component='textarea'
                value={formData.address as string}
                onChange={handleChange('address')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="Description"
                name="description"
                component="textarea"
                value={formData.description as string}
                onChange={handleChange('description')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="Favorite"
                name="favorite"
                component="switch"
                value={formData.isFavorite as boolean}
                onChange={handleChange('isFavorite')}
                disabled={disabled}
            />

            <FormField
                label="Website Link"
                name="websiteLink"
                type="url"
                component='input'
                value={formData.website || ''}
                onChange={handleChange('website')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="LinkedIn Link"
                name="linkedInLink"
                type="url"
                component='input'
                value={formData.socialLink || ''}
                onChange={handleChange('socialLink')}
                disabled={disabled}
                errors={errors}
            />

            {!disabled && (
                <div className="sticky bottom-0 pt-4 bg-white dark:bg-black border-t mt-6">
                    <LoadingButton type="submit" className="w-full" onClick={handleSubmit} loading={loading}>
                        Save Changes
                    </LoadingButton>
                </div>
            )}
        </form>
    );
}