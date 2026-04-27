import React from 'react';
import { getMyPurchaseCourse } from '@/app/apiActions/purchase';
import Link from 'next/link';
import PurchaseCourseDetails from '@/components/courseDetails/PurchaseCourseDetails';
import { Rocket, GraduationCap } from 'lucide-react';

// ekhane  purchase kora course gulo dekhabe
export default async function ProfileOverview() {

    const { status, data: purchasedCourses } = await getMyPurchaseCourse();

    // console.log(status ,purchasedCourses)
    //     // questionsGetAllByPaidStudent
    //     if (status !== 200) {
    //         return <NoData text={"আপনি কোন কোর্সে ভর্তি হননি! "} />
    //     }



    if (status !== 200 || purchasedCourses?.length < 1) {
        return (
            <div className="w-full relative overflow-hidden bg-white border border-slate-100 p-8 md:p-12 text-center rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 my-10">
                {/* Background Decorative Element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-50"></div>

                <div className="relative z-10">
                    {/* Icon Section */}
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
                        <GraduationCap size={40} />
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 leading-tight">
                        আপনার প্রস্তুতির যাত্রা <br /> <span className="text-indigo-600">এখান থেকেই শুরু হোক!</span>
                    </h2>

                    <p className="text-slate-500 mb-8 max-w-md mx-auto text-base md:text-lg font-medium">
                        আপনি এখনও কোনো কোর্সে যুক্ত হননি। অনুশীলন একাডেমির বিশেষ কোর্সে যুক্ত হয়ে অংশ নিন লাইভ পরীক্ষা ও নিয়মিত কুইজে।
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95 group"
                            href="/courses"
                        >
                            <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            কোর্সে যুক্ত হন
                        </Link>

                        <Link
                            className="text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all"
                            href="/courses"
                        >
                            ফ্রি ডেমো দেখুন
                        </Link>
                    </div>
                </div>
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