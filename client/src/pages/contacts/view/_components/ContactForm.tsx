import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FormField } from './FormField';
import { validateForm } from './validation';
import { FormData, FormErrors } from './types';

interface ContactFormProps {
    initialData: FormData;
    disabled?: boolean;
    onSubmit: (data: FormData) => void;
}

export function ContactForm({ initialData, disabled, onSubmit }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>(initialData);
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

    const handleChange = (field: keyof FormData) => (value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when field is modified
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
                value={formData.phoneNumber}
                onChange={handleChange('phoneNumber')}
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
                value={formData.favorite as boolean}
                onChange={handleChange('favorite')}
                disabled={disabled}
            />

            <FormField
                label="Website Link"
                name="websiteLink"
                type="url"
                component='input'
                value={formData.websiteLink || ''}
                onChange={handleChange('websiteLink')}
                disabled={disabled}
                errors={errors}
            />

            <FormField
                label="LinkedIn Link"
                name="linkedInLink"
                type="url"
                component='input'
                value={formData.linkedinLink || ''}
                onChange={handleChange('linkedinLink')}
                disabled={disabled}
                errors={errors}
            />

            {!disabled && (
                <div className="sticky bottom-0 pt-4 bg-white dark:bg-black border-t mt-6">
                    <Button type="submit" className="w-full">
                        Save Changes
                    </Button>
                </div>
            )}
        </form>
    );
}