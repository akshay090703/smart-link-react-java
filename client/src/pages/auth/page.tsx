import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { FloatingInput, FloatingLabel } from "@/components/FloatingInput";
import { LoadingButton } from "@/components/LoadingButton";
import { apiClient } from "@/lib/api-client";
import { AxiosResponse } from "axios";
import { FloatingLabelForTextArea, FloatingTextarea } from "@/components/FloatingTextarea";
import { Button } from "@/components/ui/button";
import { SignUpResponse } from '../../lib/api-types';
import toast from "react-hot-toast";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // SignUp
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');

    // Login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Errors
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        about: "",
        phone: ""
    });

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

    const validateSignupInput = (): boolean => {
        const newErrors: { username: string; email: string; password: string; about: string; phone: string; } = {
            username: "",
            email: "",
            password: "",
            about: "",
            phone: ""
        };

        if (username.length < 2) {
            newErrors.username = "Username must be at least 2 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email address.";
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        // const phoneRegex = /^\d{8}$/;
        if (phone.length < 8) {
            newErrors.phone = "Phone number must be atleast 8 digits.";
        }

        if (about.length === 0 || about.length > 100) {
            newErrors.about = "About section must be 0 to 100 characters.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleInputChange = (field: string, value: string) => {
        const newErrors = { ...errors };

        // Update the value and validate in real-time
        switch (field) {
            case 'username':
                setUsername(value);
                newErrors.username = value.length >= 2 ? "" : "Username must be at least 2 characters.";
                break;
            case 'email':
                setEmail(value);
                newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address.";
                break;
            case 'password':
                setPassword(value);
                newErrors.password = value.length >= 6 ? "" : "Password must be at least 6 characters.";
                break;
            case 'phone':
                setPhone(value);
                newErrors.phone = value.length >= 8 ? "" : "Phone number must be atleast 8 digits.";
                break;
            case 'about':
                setAbout(value);
                newErrors.about = value.length > 0 && value.length <= 100 ? "" : "About section must be 0 to 100 characters.";
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

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

    const resetSignupForm = () => {
        event?.preventDefault();
        setUsername("");
        setEmail("");
        setPassword("");
        setAbout("");
        setPhone("");
        setErrors({ username: "", email: "", password: "", about: "", phone: "" });
    };

    const resetLoginForm = () => {
        event?.preventDefault()
        setLoginEmail("");
        setLoginPassword("");
        setLoginErrors({ email: "", password: "" })
    };

    const onLogin = async (event: React.FormEvent) => {
        event?.preventDefault();
        setIsLoading(true);

        if (!validateLoginInput()) {
            toast.error("Please fix all the error!")
            setIsLoading(false);
            return
        }

        try {
            const res: AxiosResponse = await apiClient.post("/auth/login", { loginEmail, loginPassword })

            if (res.status === 200) {
                const data = res.data;
                // console.log(data);
                toast.success("Logged in successfully!");

                navigate("/home");
            }
        } catch (error) {
            toast.error("There was some error");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    async function onSignUp(event: React.FormEvent) {
        event.preventDefault();
        if (!validateSignupInput()) {
            toast.error("Please fix the errors in the form.");
            return;
        }

        setIsLoading(true);

        try {
            const res: AxiosResponse = await apiClient.post(
                "/auth/signup",
                {
                    username,
                    email,
                    password,
                    about,
                    phone
                }
            );

            if (res.status === 201) {
                const data: SignUpResponse = res.data;
                console.log(data);
                toast.success("Account created successfully!");
            }
        } catch (error) {
            toast.error("There was some error!");
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                navigate("/");
            }, 1000);
        }
    }

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center min-h-[80vh]">
                <Card className="w-full max-w-[27rem] lg:max-w-[30rem]">
                    <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin">
                            <form>
                                <CardHeader>
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
                        </TabsContent>

                        <TabsContent value="signup">
                            <form>
                                <CardHeader>
                                    <CardTitle>Create Account</CardTitle>
                                    <CardDescription>
                                        Enter your details to create a new account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex flex-col gap-2">
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-username" value={username} onChange={(e) => handleInputChange('username', e.target.value)} />
                                            <FloatingLabel htmlFor="floating-username">Username</FloatingLabel>
                                        </div>
                                        {errors.username && <p className="text-center text-red-500 text-sm">{errors.username}</p>}
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-email" value={email} onChange={(e) => handleInputChange('email', e.target.value)} />
                                            <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                                        </div>
                                        {errors.email && <p className="text-center text-red-500 text-sm">{errors.email}</p>}
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-phone-number" type="tel" value={phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                                            <FloatingLabel htmlFor="floating-phone-number">Phone No.</FloatingLabel>
                                        </div>
                                        {errors.phone && <p className="text-center text-red-500 text-sm">{errors.phone}</p>}
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-password" value={password} onChange={(e) => handleInputChange('password', e.target.value)} type="password" />
                                            <FloatingLabel htmlFor="floating-password">Password</FloatingLabel>
                                        </div>
                                        {errors.password && <p className="text-center text-red-500 text-sm">{errors.password}</p>}
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingTextarea id="floating-about" value={about} onChange={(e) => handleInputChange('about', e.target.value)} rows={5} maxLength={100} />
                                            <FloatingLabelForTextArea htmlFor="floating-about">About</FloatingLabelForTextArea>
                                        </div>
                                        {errors.about && <p className="text-center text-red-500 text-sm">{errors.about}</p>}
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-3">
                                    <LoadingButton className="w-full dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:transition-all dark:duration-150 dark:ease-in" loading={isLoading} onClick={onSignUp}>
                                        Create Account
                                    </LoadingButton>
                                    <Button variant={'destructive'} onClick={resetSignupForm} className="w-full">Reset Form</Button>
                                </CardFooter>
                            </form>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}
