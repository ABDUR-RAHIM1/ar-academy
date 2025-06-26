import React from 'react';
import DeletePlanButton from './DeletePlanButton';

export default function PlanDetails({ plan }) {

    if (!plan) {
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
        <div className="w-full bg-gradient-to-br from-gray-100 to-blue-50 p-4 md:p-8 shadow-xl rounded-xl my-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">{plan.planLabel}</h2>

            <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-6 mb-8">
                <p className="text-lg text-gray-800">দাম: <span className="font-bold text-blue-800">৳{plan.price}</span></p>
                <p className="text-blue-700">কেনার তারিখ: <span className="font-medium">{purchaseDate}</span></p>
                <p className="text-indigo-700">মেয়াদ শেষ হবে: <span className="font-medium">{endDate}</span></p>
            </div>

            <div className="bg-white p-3 md:p-6 rounded-lg shadow-inner max-w-4xl mx-auto border border-blue-100">
                <h3 className="font-semibold mb-4 text-lg text-blue-700">পেমেন্ট তথ্য</h3>
                <p className="mb-2"><strong>ট্রানজেকশন আইডি:</strong> {plan.paymentDetails.transactionId}</p>
                <p className="mb-2"><strong>পেমেন্ট মাধ্যম:</strong> {plan.paymentDetails.paymentMethod}</p>
                <p><strong>পেমেন্ট স্ট্যাটাস:</strong> {plan.paymentDetails.paymentStatus}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

                <p className={` text-[16px] md:text-xl font-bold ${plan.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    স্ট্যাটাস: {plan.status === 'active' ? 'সক্রিয়' : plan.status}
                </p>

                <DeletePlanButton planId={plan._id} />
            </div>
        </div>
    );
}
