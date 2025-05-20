import Link from 'next/link';
import React from 'react';
import DeletePlanButton from './DeletePlanButton';

export default function PlanDetails({ plan }) {

    if (!plan) {
        return (
            <div className="w-full bg-gray-100 p-8 text-center rounded-lg shadow-md my-6">
                <h2 className="text-2xl font-bold text-red-500 mb-4">আপনি এখনও কোনো প্ল্যান কেনেননি</h2>
                <p className="text-gray-700 mb-6">প্ল্যান কিনে আমাদের প্রিমিয়াম সুবিধা উপভোগ করুন।</p>
                <Link
                    href={"/"}
                    className=" inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    এখনই প্ল্যান কিনুন
                </Link>
            </div>
        );
    }

    // Date formatting
    const purchaseDate = new Date(plan.purchaseDate).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const endDate = new Date(plan.endDate).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="w-full max-w-full bg-gray-200 p-8 shadow-lg rounded-none my-4">
            <h2 className="text-3xl font-bold mb-6 text-center">{plan.planLabel}</h2>

            <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-6 mb-8">
                <p className="text-xl text-gray-800">দাম: <span className="font-semibold">৳{plan.price}</span></p>
                <p className="text-blue-600">কিনেছেন: <span className="font-medium">{purchaseDate}</span></p>
                <p className="warningText">মেয়াদ শেষ হবে: <span className="font-medium">{endDate}</span></p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-inner max-w-4xl mx-auto">
                <h3 className="font-semibold mb-4 text-lg">পেমেন্ট তথ্য</h3>
                <p><strong>ট্রানজেকশন আইডি:</strong> {plan.paymentDetails.transactionId}</p>
                <p><strong>পেমেন্ট মাধ্যম:</strong> {plan.paymentDetails.paymentMethod}</p>
                <p><strong>পেমেন্ট স্ট্যাটাস:</strong> {plan.paymentDetails.paymentStatus}</p>
            </div>

            <div className=' text-center my-6 flex items-center justify-between flex-wrap'>

                <p
                    className={` text-center text-xl font-semibold ${plan.status === 'active' ? 'text-green-600' : 'text-red-600'
                        }`}
                >
                    স্ট্যাটাস: {plan.status === 'active' ? 'সক্রিয়' : plan.status}
                </p>

                <DeletePlanButton planId={plan._id} />

            </div>

        </div>
    );
}
