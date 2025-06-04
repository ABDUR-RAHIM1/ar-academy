"use client";
import Heading from "@/components/clients/globals/Heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const SoldCourseChart = ({ soldPlans = [] }) => {
    const chartData = soldPlans.map(plan => ({
        name: plan.planLabel || plan.planName,
        revenue: plan.price,
    }));

    return (
        <Card className="w-full max-w-5xl mx-auto mt-6">
            <CardHeader>
                <Heading text={"📊 বিক্রিত প্ল্যান চার্ট"} />
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default SoldCourseChart;
