// import { getSignleCourse } from '@/app/apiActions/Course';
// import React from 'react'
// import NoData from '@/utils/NoData';
// import CoursePurchaseButton from '@/components/courseActions/CoursePurchase';

// //  course Details
// export default async function CoursePreview({ params }) {

//     const { courseId } = await params

//     const { status, data: course } = await getSignleCourse(courseId);

//     if (status !== 200 || !course) {
//         return <NoData />
//     }

//     return (
//         <div className=" bg-gray-50 rounded-md md:p-10 my-10 mx-4 md:mx-10 p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Left side - course details */}
//             <div className="md:col-span-2 space-y-6 md:border-r">
//                 {/* Title */}
//                 <h1 className=" text-[24px] text-center md:text-3xl font-bold">{course.title}</h1>
//                 <div>
//                     <h3 className=' color2 text-lg font-bold my-2 underline '>যেসব বিষয়ের উপর পরিক্ষা নেওয়া হবেঃ</h3>
//                     <ul className="text-gray-600 ml-3 list-disc">
//                         {course.shortDesc &&
//                             course.shortDesc.split(",").map((item, index) => (
//                                 <li key={index}> {item}</li>
//                             ))
//                         }
//                     </ul>
//                 </div>
//                 <div>
//                     <h3 className=' color2 text-lg font-bold my-2 underline '>
//                         বিস্তারিতঃ
//                     </h3>
//                     {/* <p className="text-gray-600 whitespace-pre-line leading-relaxed">
//                         {course.description}
//                     </p> */}
//                     <ul className="text-gray-600 ml-3 list-disc">
//                         {course.description &&
//                             course.description.split(",").map((item, index) => (
//                                 <li key={index}> {item}</li>
//                             ))
//                         }
//                     </ul>
//                 </div>


//                 {/* Useful Links */}
//                 <div>
//                     <h3 className='color2 text-lg font-bold my-2 underline'> কোর্সের সাথে যা যা আক্সেস পাবেন </h3>
//                     <ul className="list-disc list-inside text-blue-600 space-y-1">
//                         {course.links.map((link) => (
//                             <li key={link._id}>

//                                 {link.itemName || "N/A"}

//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/* Right side - order/summary card */}
//             <div className="md:col-span-1">
//                 <div className="p-6 rounded-2xl shadow-lg bg-white sticky top-20 space-y-4">
//                     <div className={"w-full p-2 border text-center"}>
//                         {
//                             course.courseType !== "subAdmin" ? "শিক্ষার্থীদের জন্য" : "সাব এডমিনের জন্য"
//                         }
//                     </div>
//                     <h2 className="text-xl font-bold">অর্ডার সারসংক্ষেপ</h2>

//                     <div className="flex justify-between text-gray-700">
//                         <span>রেগুলার মূল্য</span>
//                         <span className="line-through">{course.regularPrice} ৳</span>
//                     </div>

//                     <div className="flex justify-between text-gray-700">
//                         <span>অফার মূল্য</span>
//                         <span className="font-semibold text-green-600">
//                             {course.offerPrice} ৳
//                         </span>
//                     </div>

//                     <div className="border-t pt-4 flex justify-between text-lg font-bold">
//                         <span>মোট</span>
//                         <span>{course.offerPrice} ৳</span>
//                     </div>
//                                 <CoursePurchaseButton
//                                     courseId={course._id}
//                                 /> 
//                 </div>
//             </div>
//         </div>
//     );
// }


import { getSignleCourse } from '@/app/apiActions/Course';
import React from 'react'
import NoData from '@/utils/NoData';
import CoursePurchaseButton from '@/components/courseActions/CoursePurchase';
import { CheckCircle2, Info, BookOpen, Layers, ArrowRightCircle, Star } from 'lucide-react';

export default async function CoursePreview({ params }) {
    const { courseId } = await params
    const { status, data: course } = await getSignleCourse(courseId);

    if (status !== 200 || !course) {
        return <NoData />
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Left side - Course Content */}
                <div className="lg:col-span-2 space-y-10">
                    
                    {/* Header Section */}
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider">
                            {course.courseType !== "subAdmin" ? "Student Admission" : "Sub-Admin Access"}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            {course.title}
                        </h1>
                    </div>

                    {/* Subjects Section */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="text-blue-600" size={24} />
                            <h3 className="text-xl font-bold text-slate-800">যেসব বিষয়ের উপর পরিক্ষা নেওয়া হবে</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {course.shortDesc?.split(",").map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl border border-transparent hover:border-blue-200 transition-all">
                                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                    <span className="font-medium">{item.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b pb-2">
                            <Info className="text-blue-600" size={22} />
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">বিস্তারিত বিবরণ</h3>
                        </div>
                        <div className="grid gap-3">
                            {course.description?.split(",").map((item, index) => (
                                <div key={index} className="flex gap-3 text-slate-600 leading-relaxed">
                                    <ArrowRightCircle size={18} className="text-blue-400 mt-1 shrink-0" />
                                    <p>{item.trim()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                 {/* Access/Links Section - Conditional Rendering */}
{course.links && course.links.length > 0 ? (
    // ১. যদি লিঙ্ক থাকে - প্রিমিয়াম ডার্ক ডিজাইন
    <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden group transition-all duration-500">
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Layers size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold italic tracking-tight">কোর্সের সাথে যা যা এক্সেস পাবেন</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.links.map((link) => (
                    <div 
                        key={link._id} 
                        className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all group/item"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-400 group-hover/item:scale-150 transition-transform"></div>
                        <span className="font-medium text-slate-200">{link.itemName || "N/A"}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
    </div>
) : (
    // ২. যদি লিঙ্ক না থাকে - স্ট্যান্ডার্ড বেনিফিট কার্ড
    <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 group hover:bg-blue-100/50 transition-colors">
        <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
            <Star size={32} fill="currentColor" className="opacity-80" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-blue-900 mb-1">প্রিমিয়াম স্টুডেন্ট সাপোর্ট</h3>
            <p className="text-blue-700/70 text-sm leading-relaxed">
                এই কোর্সে এনরোল করার পর আপনি আমাদের স্পেশাল ড্যাশবোর্ড এক্সেস পাবেন যেখানে নিয়মিত আপডেট এবং পরীক্ষার এনালাইসিস রিপোর্ট দেখতে পাবেন।
            </p>
        </div>
    </div>
)}
                </div>

                {/* Right side - Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.1)] border border-slate-100 space-y-6">
                        <div className="text-center pb-4 border-b">
                            <h2 className="text-2xl font-black text-slate-800">অর্ডার সারসংক্ষেপ</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-slate-500">
                                <span className="font-medium">রেগুলার মূল্য</span>
                                <span className="text-lg line-through decoration-red-400 decoration-2 italic">
                                    {course.regularPrice} ৳
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-green-50 p-4 rounded-2xl">
                                <span className="text-green-700 font-bold">অফার মূল্য</span>
                                <span className="text-2xl font-black text-green-600 tracking-tighter">
                                    {course.offerPrice} ৳
                                </span>
                            </div>

                            <div className="pt-4 flex justify-between items-center text-xl font-black text-slate-900 border-t-2 border-dashed border-slate-100">
                                <span>সর্বমোট</span>
                                <span className="text-3xl text-blue-700 leading-none tracking-tighter">
                                    {course.offerPrice} ৳
                                </span>
                            </div>
                        </div>

                        <div className="pt-4"> 
                            <CoursePurchaseButton courseId={course._id} courseAmount={course.offerPrice} />
                            <p className="text-center text-xs text-slate-400 mt-4 px-4 font-medium leading-relaxed">
                                 {
                                 Number(course.offerPrice) <= 0  ? "শুধু বাটনে ক্লিক করলেই আপনার প্রোফাইল কোর্সের এক্সেস পেয়ে যাবেন " : "পেমেন্ট সম্পন্ন করার পর সাথে সাথেই আপনার প্রোফাইল কোর্সের এক্সেস পেয়ে যাবেন"
                                 }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}