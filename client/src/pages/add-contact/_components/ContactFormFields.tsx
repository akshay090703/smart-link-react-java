import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FloatingLabel, FloatingInput } from '@/components/FloatingInput';
import { FloatingLabelForTextArea, FloatingTextarea } from "@/components/FloatingTextarea";

interface ContactFormFieldsProps {
    formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
        description: string;
        website: string;
        socialLink: string;
        isFavorite: boolean;
    };
    errors: {
        [key: string]: string;
    };
    onChange: (field: string, value: string | boolean) => void;
}

export function ContactFormFields({ formData, errors, onChange }: ContactFormFieldsProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput
                            id="name"
                            value={formData.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className={errors.name ? 'border-destructive' : ''}
                        />
                        <FloatingLabel htmlFor="name">Name</FloatingLabel>
                    </div>
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            className={errors.email ? 'border-destructive' : ''}
                        />
                        <FloatingLabel htmlFor="email">Email</FloatingLabel>
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            className={errors.phone ? 'border-destructive' : ''}
                        />
                        <FloatingLabel htmlFor="phone">Phone Number</FloatingLabel>
                    </div>

                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => onChange('website', e.target.value)}
                            className={errors.website ? 'border-destructive' : ''}
                        />
                        <FloatingLabel htmlFor="website">Website</FloatingLabel>
                    </div>

                    {errors.website && <p className="text-sm text-destructive">{errors.website}</p>}
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput
                            id="socialLink"
                            value={formData.socialLink}
                            onChange={(e) => onChange('socialLink', e.target.value)}
                            className={errors.socialLink ? 'border-destructive' : ''}
                        />
                        <FloatingLabel htmlFor="socialLink">Social Link</FloatingLabel>
                    </div>
                    {errors.socialLink && <p className="text-sm text-destructive">{errors.socialLink}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <div className="relative">
                    <FloatingTextarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => onChange('address', e.target.value)}
                        className={`min-h-[100px] ${errors.address ? 'border-destructive' : ''}`}
                    />
                    <FloatingLabelForTextArea htmlFor="address">Address</FloatingLabelForTextArea>
                </div>
                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
            </div>

            <div className="space-y-2">
                <div className="relative">
                    <FloatingTextarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        className={`min-h-[100px] ${errors.description ? 'border-destructive' : ''}`}
                    />
                    <FloatingLabelForTextArea htmlFor="description">Description</FloatingLabelForTextArea>
                </div>
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="favorite"
                    checked={formData.isFavorite}
                    onCheckedChange={(checked) => onChange('isFavorite', checked as boolean)}
                />
                <Label htmlFor="favorite">Mark as favorite contact</Label>
            </div>
        </div>
    );
}