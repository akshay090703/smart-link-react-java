import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";
import LoginForm from "./_components/LoginForm";
import SignupForm from "./_components/SignupForm";

export default function AuthPage() {
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
                            <LoginForm />
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
