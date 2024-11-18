import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { FloatingInput, FloatingLabel } from "@/components/FloatingInput";
import { LoadingButton } from "@/components/LoadingButton";
import { apiClient } from "@/lib/api-client";
import { AxiosResponse } from "axios";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        const res: AxiosResponse = await apiClient.get(
            "/"
        )



        if (res.status === 200) {
            console.log("success");

            console.log(res.data);
        }

        setTimeout(() => {
            setIsLoading(false);
            navigate("/");
        }, 1000);
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
                            <form onSubmit={onSubmit}>
                                <CardHeader>
                                    <CardTitle>Sign In</CardTitle>
                                    <CardDescription>
                                        Enter your email and password to access your account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex flex-col gap-2">
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <FloatingInput id="floating-email" />
                                            <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <FloatingInput id="floating-password" />
                                            <FloatingLabel htmlFor="floating-password">Password</FloatingLabel>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <LoadingButton className="w-full dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:transition-all dark:duration-150 dark:ease-in" loading={isLoading} type="submit">
                                        Sign In
                                    </LoadingButton>
                                </CardFooter>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form onSubmit={onSubmit}>
                                <CardHeader>
                                    <CardTitle>Create Account</CardTitle>
                                    <CardDescription>
                                        Enter your details to create a new account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex flex-col gap-2">
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-email" />
                                            <FloatingLabel htmlFor="floating-email">Email</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-password" />
                                            <FloatingLabel htmlFor="floating-password">Password</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="relative">
                                            <FloatingInput id="floating-confirm-password" />
                                            <FloatingLabel htmlFor="floating-confirm-password">Confirm Password</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="relative">
                                            <FloatingInput id="floating-first-name" />
                                            <FloatingLabel htmlFor="floating-first-name">First Name</FloatingLabel>
                                        </div>
                                        <div className="relative">
                                            <FloatingInput id="floating-last-name" />
                                            <FloatingLabel htmlFor="floating-last-name">Last Name</FloatingLabel>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <LoadingButton className="w-full dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:transition-all dark:duration-150 dark:ease-in" loading={isLoading} type="submit">
                                        Sign Up
                                    </LoadingButton>
                                </CardFooter>
                            </form>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}

// text-slate-400