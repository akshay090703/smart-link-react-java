import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    CartesianGrid
} from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Contact } from '../../contacts/view/_components/types';
import { XAxis, YAxis } from 'recharts';

interface ContactsChartProps {
    contacts: Contact[];
}

export function ContactsChart({ contacts }: ContactsChartProps) {
    const [chartType, setChartType] = useState<'distribution' | 'social'>('distribution');

    // Calculate social presence data (percentage of contacts with social links vs without)
    const socialData = [
        {
            name: 'Has LinkedIn Profile',
            value: contacts.filter(c => c.linkedinLink).length,
        },
        {
            name: 'No LinkedIn Profile',
            value: contacts.filter(c => !c.linkedinLink).length,
        },
    ];

    const distributionData = [
        {
            category: 'Favourites',
            complete: contacts.filter(c => c.favorite).length,
            total: contacts.length,
        },
        {
            category: 'LinkedIn Profiles',
            complete: contacts.filter(c => c.websiteLink || c.linkedinLink).length,
            total: contacts.length,
        },
        {
            category: 'Profile Photo',
            complete: contacts.filter(
                c => c.picture && c.picture !== "https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png"
            ).length,
            total: contacts.length,
        }
    ];

    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

    return (
        <Card className="col-span-4">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Contact Analytics</CardTitle>
                        <CardDescription>
                            {chartType === 'distribution'
                                ? 'Distribution of contact information completeness'
                                : 'Social media presence analysis'}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={chartType === 'distribution' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setChartType('distribution')}
                        >
                            Distribution
                        </Button>
                        <Button
                            variant={chartType === 'social' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setChartType('social')}
                        >
                            Social
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    {chartType === 'distribution' ? (
                        <BarChart
                            data={distributionData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            barSize={40}
                        >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="category"
                                className="text-sm fill-muted-foreground"
                                tick={{ fill: 'currentColor' }}
                            />
                            <YAxis
                                className="text-sm fill-muted-foreground"
                                tick={{ fill: 'currentColor' }}
                                label={{
                                    value: 'Number of Contacts',
                                    angle: -90,
                                    position: 'insideLeft',
                                    className: 'fill-muted-foreground'
                                }}
                                domain={[0, contacts.length]}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    color: 'hsl(var(--foreground))'
                                }}
                                cursor={{ fill: 'hsl(var(--muted))' }}
                            />
                            <Bar
                                dataKey="complete"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={socialData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                                {socialData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}