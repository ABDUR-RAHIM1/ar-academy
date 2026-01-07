// import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import CoursePreview from "@/components/courseActions/CoursePreview";
// import { Clock, Star } from "lucide-react";
// import { formatDate } from '@/utils/FormatDate';

// export default function CourseCard({ course }) {
//     return (
//         <Card
//             className="rounded-2xl shadow-md hover:shadow-xl transition w-full"
//         >
//             <div className={"w-full p-2 border flex items-center justify-between flex-wrap"}>
//                 <div className={`my-2 text-sm font-semibold flex flex-col`}>
//                     <p>পরিক্ষা শুরু হবে</p>
//                     <p className={" text-[12px]"}> {course?.startDate ? formatDate(course.startDate) : "চলমান"}</p>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
//                     <Clock className="w-4 h-4 text-blue-500" />
//                     <span>{course.duration} মাস</span>
//                 </div>

//             </div>
//             <CardHeader>

//                 <CardTitle className="text-lg font-semibold">
//                     <div className=" flex items-center gap-2 text-blue-600">
//                         <span>
//                             <Star size={20} />
//                         </span>
//                         {course.name}
//                     </div>

//                     <p className=" my-2 text-sm text-center">
//                         {course.title}
//                     </p>

//                 </CardTitle>


//                 <p className="text-sm text-gray-600 font-bold underline mt-3">
//                     যে বিষয়গুলোর উপর পরিক্ষা হবেঃ
//                 </p>
//                 <ul className="ml-4 list-disc">
//                     {
//                         course.shortDesc && course.shortDesc.split(",").map((item, index) => (
//                             <li key={index}>
//                                 {item}
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </CardHeader>

//             <CardContent>
//                 <div className="mb-4">
//                     <p className="text-red-500 line-through text-sm">
//                         {course.regularPrice > 0 && `${course.regularPrice} টাকা`}
//                     </p>
//                     <p className="text-xl font-bold color1">
//                         {course.offerPrice > 0 ? `${course.offerPrice} টাকা` : "ফ্রি"}
//                     </p>
//                 </div>

//                 <CoursePreview courseId={course._id} />
//             </CardContent>
//         </Card>
//     )
// }



import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import CoursePreview from "@/components/courseActions/CoursePreview";
import { Clock, Star, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { formatDate } from '@/utils/FormatDate';


export default function CourseCard({ course }) {
    return (
        <Card className="group relative overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 w-full flex flex-col h-full">
            
            {/* Top Header - Status & Duration */}
            <div className="flex items-center justify-between p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">শুরু</span>
                        <span className="text-[11px] font-bold text-slate-700">
                            {course?.startDate ? formatDate(course.startDate) : "চলমান"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{course.duration} মাস</span>
                </div>
            </div>

            {/* Course Title Section */}
            <div className="p-6 flex-grow">
                <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                        <Star size={20} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                            {course.name}
                        </h3>
                    </div>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4 italic">
                    {course.title}
                </p>

                {/* Subjects Section */}
                <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        সিলেবাস হাইলাইটস
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {course.shortDesc && course.shortDesc.split(",").map((item, index) => (
                            <span 
                                key={index}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium border border-transparent hover:border-blue-200 hover:bg-blue-50 transition-all"
                            >
                                <CheckCircle2 size={12} className="text-blue-500" />
                                {item.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price & Footer */}
            <CardContent className="mt-auto pt-0">
                <div className="flex items-end justify-between border-t border-slate-50 pt-6">
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">কোর্স ফি</p>
                        <div className="flex flex-col space-y-2">
                            {course.regularPrice > 0 && (
                                <span className="text-sm text-red-400 line-through font-medium">
                                    ৳{course.regularPrice}
                                </span>
                            )}
                            <span className="text-2xl font-black italic text-slate-900 leading-none">
                                {course.offerPrice > 0 ? `৳${course.offerPrice}` : "ফ্রি!"}
                            </span>
                        </div>
                    </div>

                    <div className="">
                        <CoursePreview courseId={course._id} />
                    </div>
                </div>
            </CardContent>

            {/* Decorative Background Element */}
            <div className="absolute -bottom-12 -left-12 w-44 h-32 bg-blue-50 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
        </Card>
    )
}     