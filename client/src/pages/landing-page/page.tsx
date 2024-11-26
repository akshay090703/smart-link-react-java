
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="flex h-screen flex-col">
            <div className="flex-grow flex flex-col justify-center items-center text-center space-y-8 ">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                    Manage contacts,{" "}
                    <span className="text-primary">smarter</span> 🚀
                </h1>
                <p className="text-xl text-muted-foreground max-w-[42rem]">
                    Streamline your connections with SmartLink's intelligent contact management. Organize, analyze, and nurture your network effortlessly.
                </p>
                <Link to={"/auth"}>
                    <Button size="lg" className="group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>

                {/* <div className="w-full max-w-5xl mt-16">
                <div className="rounded-2xl border bg-card p-8 shadow-lg">
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/50" />
                </div>
            </div> */}
            </div>
        </div>
    );
}