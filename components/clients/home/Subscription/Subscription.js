import React from 'react'
import SubScribeButton from './SubScribeButton';

export default function Subscription() {

    const plans = [
        {
            plan: "ফ্রি",
            description: "শুধুমাত্র ফ্রি কন্টেন্ট",
            price: "৳0",
            border: "",
            discount: ""
        },
        {
            plan: "মাসিক",
            description: "সম্পূর্ণ অ্যাক্সেস",
            price: "৳99",
            border: "border-2 border-yellow-500",
            discount: ""
        },
        {
            plan: "অর্ধ-বার্ষিক",
            description: "১০% ডিসকাউন্ট",
            price: "৳390",
            border: "",
            discount: "১০% ডিসকাউন্ট"
        },
        {
            plan: "বার্ষিক",
            description: "৩০% ডিসকাউন্ট",
            price: "৳599",
            border: "border-2 border-green-500",
            discount: "৩০% ডিসকাউন্ট"
        },
    ];
    const borders = ["border-gray-400", "border-yellow-500", "border-blue-800", "border-blue-green-300"];

    return (
        <div className='my-10 px-3 md:px-5 py-10 rounded-md bg2'>
            <div className=' md:bg-white py-10 rounded-md'>
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">সাবস্ক্রিপশন প্ল্যান বেছে নিন</h2>
                    <p className="mb-8 text-lg">আপনার প্রয়োজন অনুযায়ী আমাদের সাবস্ক্রিপশন প্ল্যান বেছে নিন</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {plans.map((plan, index) => (
                        <div key={index} className={`w-full sm:w-[48%] md:w-[22%] bg-white color1 rounded-2xl p-6 shadow-lg text-center border border2 hover:bg-gray-200 hover:border1 transition-all`}>
                            <h3 className="text-2xl font-semibold">{plan.plan}</h3>
                            <p className="text-lg my-4">{plan.description}</p>
                            <p className="text-3xl font-bold">{plan.price}</p>
                            <SubScribeButton
                                planInfoData={plan}
                            /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
