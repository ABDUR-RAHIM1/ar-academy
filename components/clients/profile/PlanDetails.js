import React from 'react';
import { getMyPurchaseCourse } from '@/app/apiActions/purchase';
import NoData from '@/utils/NoData';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Link as LinkIcon, Tag } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function PlanDetails({ userId }) {

    const { status, data: purchasedCourses } = await getMyPurchaseCourse();
  

    if (status !== 200 || !purchasedCourses) {
        return <NoData />
    }

    if (!userId || purchasedCourses?.length < 1) {
        return (
            <div className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4 md:p-8 text-center rounded-xl shadow-lg my-6">
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">আপনি এখনও কোনো প্ল্যান কেনেননি</h2>
                <p className="text-gray-700 mb-6">প্ল্যান কিনে আমাদের প্রিমিয়াম সুবিধা উপভোগ করুন।</p>

                <a
                    className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg hover:scale-105 hover:shadow-md transition-transform"
                    href="/#plans"
                >
                    এখনই প্ল্যান কিনুন
                </a>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center mb-6">
                🎓 আমার কোর্স সমূহ
            </h1>

            {purchasedCourses.map((item) => (
                <Card
                    key={item._id}
                    className="shadow-md rounded-2xl border border-gray-200"
                >
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>{item.course.title}</span>
                            <div className="text-right">
                                <p className="text-sm line-through text-gray-400">
                                    ৳ {item.course.regularPrice}
                                </p>
                                <p className="text-lg font-bold text-green-600">
                                    ৳ {item.course.offerPrice}
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <div className=' my-4 flex items-center justify-center'>
                        <Button asChild className={" rounded-full w-[250px] bg-blue-500 text-white"}>
                            <Link href={"/exam"}>
                                প্রশ্ন গুলো দেখুন
                            </Link>
                        </Button>
                    </div>

                    <CardContent className="space-y-3 text-sm text-gray-700">
                        {/* Short Desc */}
                        <p className="whitespace-pre-line">{item.course.shortDesc}</p>

                        {/* Description */}
                        <div>
                            <h3 className="font-semibold mb-1">📖 কোর্সের বিস্তারিত:</h3>
                            <p className="whitespace-pre-line">{item.course.description}</p>
                        </div>

                        {/* Links */}
                        <div>
                            <h3 className="font-semibold mb-1 flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" /> রিসোর্স সমূহ:
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {item.course.links.map((link) => (
                                    <li key={link._id}>
                                        <a
                                            href={link.path}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {link.itemName || "N/A"}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Payment Info */}
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>
                                Payment: {item.paymentDetails.paymentMethod} (Txn:{" "}
                                {item.paymentDetails.transactionId})
                            </span>
                        </div>

                        {/* Created / Updated */}
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>
                                কিনেছেন:{" "}
                                {new Date(item.course.createdAt).toLocaleDateString("bn-BD")}
                            </span>
                            {/* End Date */}
                            <div className="flex items-center gap-2 text-red-500">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    মেয়াদ শেষ হবে:{" "}
                                    {new Date(item.endDate).toLocaleDateString("bn-BD")}
                                </span>
                            </div>
                        </div>



                    </CardContent>
                </Card>
            ))}
        </div>
    );
}