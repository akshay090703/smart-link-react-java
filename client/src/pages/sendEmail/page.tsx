import { useState } from 'react';
import toast from 'react-hot-toast';
import { EmailDetails } from './_components/email';
import { EmailForm } from './_components/EmailForm';
import { apiClient } from '../../lib/api-client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function SendEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const recipient = location.state;

    const handleSendEmail = async (emailDetails: EmailDetails) => {
        setIsLoading(true);

        console.log(emailDetails);

        const formData = new FormData();
        formData.append('from', emailDetails.sender || '');
        formData.append('recipient', emailDetails.recipient);
        formData.append('subject', emailDetails.subject)
        formData.append('body', emailDetails.body);

        if (emailDetails.attachment) {
            formData.append('attachment', emailDetails.attachment)
        }

        console.log(formData);


        try {
            const response = await apiClient.post('/sendMail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.status === 200) {
                toast.success('Email sent successfully');
            }
        } catch (error) {
            toast.error('Failed to send email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <div className="space-y-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>

                <div>
                    <h1 className="text-3xl font-bold">Compose Email</h1>
                    <p className="text-muted-foreground">
                        Create and send your email message
                    </p>
                </div>

                <EmailForm
                    onSubmit={handleSendEmail}
                    isLoading={isLoading}
                    recipient={recipient}
                />
            </div>
        </div>
    );
}