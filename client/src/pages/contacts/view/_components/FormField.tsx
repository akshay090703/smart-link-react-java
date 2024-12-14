import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FormErrors } from './types';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string | boolean;
    onChange: (value: string | boolean) => void;
    disabled?: boolean;
    errors?: FormErrors;
    component?: 'input' | 'textarea' | 'switch';
}

export function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    disabled,
    errors,
    component = 'input'
}: FormFieldProps) {
    const error = errors?.[name];

    const renderInput = () => {
        switch (component) {
            case 'textarea':
                return (
                    <Textarea
                        id={name}
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        className={error ? 'border-red-500' : ''}
                    />
                );
            case 'switch':
                return (
                    <Switch
                        checked={value as boolean}
                        onCheckedChange={(checked) => onChange(checked)}
                        disabled={disabled}
                        className="ml-3"
                    />
                );
            default:
                return (
                    <Input
                        id={name}
                        type={type}
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        className={error ? 'border-red-500' : ''}
                    />
                );
        }
    };

    return (
        <div className={`space-y-2 ${component == 'switch' && 'flex items-center'}`}>
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
            {renderInput()}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}