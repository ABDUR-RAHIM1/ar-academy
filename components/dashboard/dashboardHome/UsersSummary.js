import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    UserRoundCheck,
    ShoppingCart,
    BarChart,
    MessageCircle,
    MessageSquareReply
} from "lucide-react";
import { getUsersSummary } from '@/app/apiActions/admin/getSummary';
import NoData from '@/utils/NoData';
import Heading from '@/components/clients/globals/Heading';

const iconMap = {
    "Users": <UserRoundCheck className="text-blue-500 w-6 h-6" />,
    "Purchased": <ShoppingCart className="text-purple-500 w-6 h-6" />,
    "Results": <BarChart className="text-green-500 w-6 h-6" />,
    "Comments": <MessageCircle className="text-orange-500 w-6 h-6" />,
    "Replies": <MessageSquareReply className="text-indigo-500 w-6 h-6" />
};

export default async function UsersSummary() {
    const { status, data } = await getUsersSummary();

    if (status !== 200) {
        return <NoData text={"Courses Summary not found"} />
    }

    return (
        <div className='p-4 bg-white my-5 rounded-md'>
            <Heading text={"Users Summary"} />

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
