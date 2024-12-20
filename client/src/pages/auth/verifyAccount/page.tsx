import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailForm } from './_components/EmailForm';
import { OTPForm } from './_components/OTPForm';
import toast from 'react-hot-toast';
import { apiClient } from '../../../lib/api-client';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

type Step = 'email' | 'otp';

export default function VerifyAccount() {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [alreadyEnabled, setAlreadyEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (email: string) => {
        setAlreadyEnabled(false)
        setIsLoading(true);
        try {
            const res = await apiClient.post('/auth/verifyEmail', { email });

            if (res.status === 200) {
                setEmail(email);
                setStep('otp');
                toast.success('OTP sent to your email');
            } else {
                toast.error('User not found');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error: ", error.response?.data || error.message);
                toast.error(error.response?.data || error.message);

                if (error.response?.data === "User already enabled!") {
                    setAlreadyEnabled(true);
                }
            } else {
                console.error("Unexpected error: ", error);
                toast.error("Credentials do not match or login with social links!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPSubmit = async (otp: string) => {
        setIsLoading(true);
        try {
            const res = await apiClient.post('/auth/verifyAccount', { email, otp });

            if (res.status === 200) {
                toast.success('Successfully verified');
                navigate('/auth');
            } else {
                toast.error('Invalid OTP');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Welcome</h1>
                    <p className="text-muted-foreground">
                        {step === 'email'
                            ? 'Enter your email to verify account'
                            : 'Enter the OTP sent to your email'}
                    </p>
                </div>

                {alreadyEnabled &&
                    <div className="text-center text-red-500 space-y-2 flex flex-col gap-1">
                        <p>User is already enabled. Please log in.</p>
                        <Link to="/auth" className="text-blue-600 underline">
                            Go back to login
                        </Link>
                    </div>
                }
                {step === 'email' ? (
                    <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
                ) : (
                    <OTPForm
                        email={email}
                        onSubmit={handleOTPSubmit}
                        onResend={handleEmailSubmit}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}
