import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./_components/LoginForm";
import SignupForm from "./_components/SignupForm";
import { GithubLoginButton } from "./_components/GithubLoginButton";
import { GoogleLoginButton } from "./_components/GoogleLoginButton";

export default function AuthPage() {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/google`
    };

    const handleGithubLogin = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/github`
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-[80vh] mt-2">
                <Card className="w-full max-w-[27rem] lg:max-w-[30rem]">
                    <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin">
                            <LoginForm />

                            <div className="flex items-center mb-4">
                                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                                <span className="mx-4 text-sm font-medium text-gray-500 dark:text-gray-400">OR</span>
                                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                            </div>

                            <div className="flex flex-col gap-3 items-center justify-center mb-3">
                                <GoogleLoginButton onLogin={handleGoogleLogin} />
                                <GithubLoginButton onLogin={handleGithubLogin} />
                            </div>
                        </TabsContent>

                        <TabsContent value="signup">
                            <SignupForm />
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}
