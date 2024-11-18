import { useEffect, useState } from "react";
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

    const resetSignupForm = () => {
        event?.preventDefault()
        setUsername("");
        setEmail("");
        setPassword("");
        setAbout("");
        setPhone("");
    }

    const resetLoginForm = () => {
        event?.preventDefault()
        setLoginEmail("");
        setLoginPassword("");
    }

    const onLogin = async (event: React.FormEvent) => {
        event?.preventDefault();
        setIsLoading(true);

        setIsLoading(false);
        navigate("/home")
    }

    async function onSignUp(event: React.FormEvent) {
        event.preventDefault();
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
            )

            if (res.status === 201) {
                console.log("success");
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                navigate("/")
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
                                            <FloatingInput id="floating-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                            <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <FloatingInput id="floating-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" />
                                            <FloatingLabel htmlFor="floating-password">Password</FloatingLabel>
                                        </div>
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
                                            <FloatingInput id="floating-username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <FloatingLabel htmlFor="floating-username">Username</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-phone-number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            <FloatingLabel htmlFor="floating-phone-number">Phone No.</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                                            <FloatingLabel htmlFor="floating-password">Password</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingTextarea id="floating-about" value={about} onChange={(e) => setAbout(e.target.value)} />
                                            <FloatingLabelForTextArea htmlFor="floating-about">About</FloatingLabelForTextArea>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-3">
                                    <LoadingButton className="w-full dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:transition-all dark:duration-150 dark:ease-in" loading={isLoading} onClick={onSignUp}>
                                        Sign Up
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