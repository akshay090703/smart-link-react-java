import {
    Smartphone,
    Cloud,
    Lock,
    Mail,
    Search,
    Share2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ServicesPage() {
    const navigate = useNavigate();

    const services = [
        {
            icon: <Cloud className="h-8 w-8" />,
            title: 'Cloud Storage',
            description:
                'Store your contacts securely in the cloud with automatic backup and synchronization across devices.',
        },
        {
            icon: <Lock className="h-8 w-8" />,
            title: 'Advanced Security',
            description:
                'End-to-end encryption ensures your contact information remains private and secure.',
        },
        {
            icon: <Mail className="h-8 w-8" />,
            title: 'Email Integration',
            description:
                'Send emails directly to your contacts from within the application.',
        },
        // {
        //     icon: <Users className="h-8 w-8" />,
        //     title: 'Contact Groups',
        //     description:
        //         'Organize contacts into groups for better management and bulk actions.',
        // },
        {
            icon: <Search className="h-8 w-8" />,
            title: 'Smart Search',
            description:
                'Quickly find contacts with our advanced search and filtering capabilities.',
        },
        // {
        //     icon: <Database className="h-8 w-8" />,
        //     title: 'Data Import/Export',
        //     description:
        //         'Easily import contacts from other platforms or export them for backup.',
        // },
        {
            icon: <Smartphone className="h-8 w-8" />,
            title: 'Mobile Access',
            description:
                'Access your contacts on any device with our responsive web application.',
        },
        {
            icon: <Share2 className="h-8 w-8" />,
            title: 'Contact Sharing',
            description:
                'Share contact information securely with other users of the platform.',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">Our Services</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Discover the powerful features and services that make Smart Contact Manager
                    the perfect solution for managing your professional network.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 p-4">
                {services.map((service) => (
                    <Card key={service.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                {service.icon}
                            </div>
                            <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-center">
                                {service.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary/5 rounded-lg p-12">
                <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of users who trust Smart Contact Manager for their contact
                    management needs. Try it for free!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => navigate('/auth')} size="lg" className="px-8">
                        Start Your journey
                    </Button>
                    {/* <Button size="lg" variant="outline" className="px-8">
              View Pricing
            </Button> */}
                </div>
            </div>
        </div>
    );
}