import * as React from 'react';

import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { Label } from '@/components/ui/label';

// Define Textarea props correctly
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return <Textarea placeholder=" " className={cn('peer', className)} ref={ref} {...props} />;
    },
);
FloatingTextarea.displayName = 'FloatingTextarea';

const FloatingLabelForTextArea = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
    return (
        <Label
            className={cn(
                'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
FloatingLabelForTextArea.displayName = 'FloatingLabelForTextArea';

type FloatingLabelTextareaProps = TextareaProps & { label?: string };

const FloatingLabelTextarea = React.forwardRef<
    React.ElementRef<typeof FloatingTextarea>,
    React.PropsWithoutRef<FloatingLabelTextareaProps>
>(({ id, label, ...props }, ref) => {
    return (
        <div className="relative">
            <FloatingTextarea ref={ref} id={id} {...props} />
            <FloatingLabelForTextArea htmlFor={id}>{label}</FloatingLabelForTextArea>
        </div>
    );
});
FloatingLabelTextarea.displayName = 'FloatingLabelTextarea';

export { FloatingTextarea, FloatingLabelForTextArea, FloatingLabelTextarea };
