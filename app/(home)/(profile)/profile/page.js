import React from 'react';
import { getMyPurchaseCourse } from '@/app/apiActions/purchase';
import NoData from '@/utils/NoData';
import Link from 'next/link';
import PurchaseCourseDetails from '@/components/courseDetails/PurchaseCourseDetails';


// ekhane  purchase kora course gulo dekhabe
export default async function ProfileOverview() {

    const { status, data: purchasedCourses } = await getMyPurchaseCourse();
 

    // questionsGetAllByPaidStudent
    if (status !== 200 || !purchasedCourses) {
        return <NoData text={"আপনি কোন কোর্সে ভর্তি হননি! "} />
    }

    if (purchasedCourses?.length < 1) {
        return (
            <div className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4 md:p-8 text-center rounded-xl shadow-lg my-6">
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">আপনি এখনও কোনো  কোর্সে যুক্ত হননি</h2>
                <p className="text-gray-700 mb-6">  আমাদের কোর্সে যুক্ত হয়ে প্রিমিয়াম সুবিধা উপভোগ করুন।</p>

                <Link
                    className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg hover:scale-105 hover:shadow-md transition-transform"
                    href="/courses"
                >
                    এখনই কোর্সে যুক্ত হন
                </Link>
            </div>
        );
    }


    return (
        <div className="max-w-4xl my-5 mx-auto p-0 md:p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center mb-6">
                🎓 আমার কোর্স সমূহ
            </h1>
            <PurchaseCourseDetails
                courseData={purchasedCourses}
                path='profile'
            />

        </div>
    );
}