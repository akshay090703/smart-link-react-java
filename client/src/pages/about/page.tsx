import { Users2, Shield, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">About Smart Contact Manager</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Your trusted platform for managing contacts efficiently and securely in the cloud.
                    We make it simple to keep your connections organized and accessible.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Secure Storage</h3>
                        <p className="text-muted-foreground">
                            Your contacts are encrypted and stored securely in the cloud, ensuring your data remains private and protected.
                        </p>
                    </CardContent>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Users2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Easy Management</h3>
                        <p className="text-muted-foreground">
                            Add, edit, and organize your contacts with ease. Keep all your important connections in one place.
                        </p>
                    </CardContent>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Direct Communication</h3>
                        <p className="text-muted-foreground">
                            Send emails directly from the app to stay connected with your contacts efficiently.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Team Section */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-12">Credits</h2>
                <div className="flex justify-center items-center">
                    {[
                        {
                            name: 'Akshay Kumar Pandey',
                            role: 'Full Stack Developer',
                            image: 'https://res.cloudinary.com/dxsyvjfy6/image/upload/v1734521792/WhatsApp_Image_2023-10-31_at_13.21.16_f9b8aa4a_dia7np.jpg',
                        },
                    ].map((member) => (
                        <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow p-3">
                            <CardContent className="p-6">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-muted-foreground">{member.role}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}