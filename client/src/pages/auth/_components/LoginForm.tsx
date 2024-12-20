import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingInput, FloatingLabel } from "@/components/FloatingInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from 'axios';
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/LoadingButton";
import { useProfile } from '../../../context/UserContext';
import axios from 'axios';
import { Link } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const { getProfileInfo } = useProfile();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false)

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [loginErrors, setLoginErrors] = useState({
        email: "",
        password: "",
    });

    const validateLoginInput = (): boolean => {
        const newErrors: { email: string; password: string; } = {
            email: "",
            password: "",
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginEmail)) {
            newErrors.email = "Invalid email address.";
        }

        if (loginPassword.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setLoginErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    }

    const handleLoginInputChange = (field: string, value: string) => {
        const newErrors = { ...loginErrors };

        // Update the value and validate in real-time
        switch (field) {
            case 'loginEmail':
                setLoginEmail(value);
                newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address.";
                break;
            case 'loginPassword':
                setLoginPassword(value);
                newErrors.password = value.length >= 6 ? "" : "Password must be at least 6 characters.";
                break;
            default:
                break;
        }

        setLoginErrors(newErrors);
    };

    const resetLoginForm = () => {
        event?.preventDefault()
        setLoginEmail("");
        setLoginPassword("");
        setLoginErrors({ email: "", password: "" })
    };

    const onLogin = async (event: React.FormEvent) => {
        setDisabled(false)
        event?.preventDefault();
        setIsLoading(true);

        if (!validateLoginInput()) {
            toast.error("Please fix all the errors!");
            setIsLoading(false);
            return;
        }

        try {
            const res = await apiClient.post("/auth/login", { loginEmail, loginPassword });

            switch (res.status) {
                case 200:
                    await getProfileInfo();
                    toast.success("Logged in successfully!");
                    navigate("/dashboard");
                    break;

                case 403:
                    toast.error("Please enable the account!");
                    break;

                default:
                    toast.error("Unexpected response. Please try again later.");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error: ", error.response?.data || error.message);
                toast.error(error.response?.data || error.message)

                if (error.response?.data == "User is disabled. Please enable account!") {
                    setDisabled(true);
                }
            } else {
                console.error("Unexpected error: ", error);
                toast.error("Credentials do not match or login with social links!");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form>
            <CardHeader>
                {isDisabled && (
                    <p className="text-center text-sm text-gray-500 mb-2">
                        Your account is disabled.{" "}
                        <Link
                            to="/auth/verifyAccount"
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                            Enable it here
                        </Link>
                    </p>
                )}
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Enter your email and password to access your account

                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col gap-2">
                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput id="floating-email" value={loginEmail} onChange={(e) => handleLoginInputChange('loginEmail', e.target.value)}
                        />
                        <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                    </div>
                    {loginErrors.email && <p className="text-center text-red-500 text-sm">{loginErrors.email}</p>}
                </div>
                <div className="space-y-2">
                    <div className="relative">
                        <FloatingInput id="floating-password" value={loginPassword} onChange={(e) => handleLoginInputChange('loginPassword', e.target.value)} type="password" />
                        <FloatingLabel htmlFor="floating-password">Password</FloatingLabel>
                    </div>
                    {loginErrors.password && <p className="text-center text-red-500 text-sm">{loginErrors.password}</p>}
                </div>
            </CardContent>
            <CardFooter className="gap-3">
                <LoadingButton className="w-full dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:transition-all dark:duration-150 dark:ease-in" loading={isLoading} onClick={onLogin}>
                    Sign In
                </LoadingButton>
                <Button variant={'destructive'} onClick={resetLoginForm} className="w-full">Reset Form</Button>
            </CardFooter>
        </form>
    )
}

export default LoginForm