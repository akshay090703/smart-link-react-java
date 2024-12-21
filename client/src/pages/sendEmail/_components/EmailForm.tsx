import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileInput } from './FileInput';
import { Send, Loader2 } from 'lucide-react';
import { EmailDetails } from './email';
import { useProfile } from '@/context/UserContext';
import toast from 'react-hot-toast';

interface EmailFormProps {
    onSubmit: (details: EmailDetails) => Promise<void>;
    isLoading: boolean;
    recipient: string
}

export function EmailForm({ onSubmit, isLoading, recipient }: EmailFormProps) {
    const { userProfile } = useProfile();
    const [senderEmail, setSenderEmail] = useState('');

    useEffect(() => {
        if (userProfile?.email) {
            setSenderEmail(userProfile.email);
            setFormData(prev => ({ ...prev, sender: senderEmail }))
        }
    }, [])

    const [formData, setFormData] = useState<EmailDetails>({
        sender: senderEmail,
        recipient: recipient,
        subject: '',
        body: '',
        attachment: null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="sender">From</Label>
                    <Input
                        id="sender"
                        name="sender"
                        value={senderEmail}
                        disabled
                        className="bg-muted"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="recipient">To</Label>
                    <Input
                        id="recipient"
                        name="recipient"
                        type="email"
                        value={formData.recipient}
                        disabled={formData.recipient ? true : isLoading}
                        className={formData.recipient && "bg-muted"}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        name="subject"
                        placeholder="Email subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="body">Message</Label>
                    <Textarea
                        id="body"
                        name="body"
                        placeholder="Write your message here..."
                        value={formData.body}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="min-h-[200px]"
                    />
                </div>

                <FileInput
                    onChange={(file) => {
                        if (file && file.size > 5 * 1024 * 1024) {
                            toast.error("The email attachment should be less than 5MB")
                            return;
                        }

                        setFormData(prev => ({ ...prev, attachment: file }))
                    }}
                    disabled={isLoading}
                />
            </div>

            <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Email
                    </>
                )}
            </Button>
        </form>
    );
}