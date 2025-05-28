import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Layers, ListOrdered, HelpCircle, Briefcase, ClipboardCheck } from "lucide-react";
import { getCourseSummary } from '@/app/apiActions/admin/getSummary';
import NoData from '@/utils/NoData';
import Heading from '@/components/clients/globals/Heading';

const iconMap = {
    "Categories": <Layers className="text-blue-500 w-6 h-6" />,
    "Sub-Categories": <ListOrdered className="text-purple-500 w-6 h-6" />,
    "Chapters": <Book className="text-green-500 w-6 h-6" />,
    "Questions": <HelpCircle className="text-orange-500 w-6 h-6" />,
    "Job Posts": <Briefcase className="text-pink-500 w-6 h-6" />,
    "Answered Length": <ClipboardCheck className="text-indigo-500 w-6 h-6" />,
};

export default async function SummaryState() {
    const { status, data } = await getCourseSummary();

    if (status !== 200) {
        return <NoData text={"Courses Summary not found"} />
    }

    return (
        <div className='p-4 bg-white my-5 rounded-md'>
            <Heading text={"Courses Summary"} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {data.map((item, index) => (
                    <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                            {iconMap[item.name]}
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold color1">{item.count}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
