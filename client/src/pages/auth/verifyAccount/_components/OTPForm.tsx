import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { OTPTimer } from './OTPTimer';

interface OTPFormProps {
    email: string;
    onSubmit: (otp: string) => Promise<void>;
    onResend: (email: string) => Promise<void>;
    isLoading: boolean;
}

export function OTPForm({ email, onSubmit, onResend, isLoading }: OTPFormProps) {
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length === 6) {
            await onSubmit(otp);
        }
    };

    const handleResend = async () => {
        await onResend(email);
        setTimeLeft(300);
        setCanResend(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-2">
            <OTPTimer timeLeft={timeLeft} className="mb-4" />

            <div className="space-y-2 flex justify-center items-center">
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={isLoading}
                >
                    <InputOTPGroup className="flex justify-center items-center">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="space-y-4">
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || otp.length !== 6}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        'Verify OTP'
                    )}
                </Button>

                <div className="text-center space-y-2">
                    {canResend && (
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-sm"
                            onClick={handleResend}
                            disabled={isLoading}
                        >
                            Resend OTP
                        </Button>
                    )}
                    <p className="text-xs text-muted-foreground">
                        OTP sent to {email}
                    </p>
                </div>
            </div>
        </form>

    );
}