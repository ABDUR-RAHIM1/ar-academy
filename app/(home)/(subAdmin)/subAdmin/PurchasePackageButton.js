"use client"
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';
import LoadingSpinner from '@/components/spinner-01';
import { Button } from '@/components/ui/button';
import { packagePurchase } from '@/constans';
import { contextD } from '@/contextApi/DashboardState'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function PurchasePackageButton({ packageId, purchasePackge, packagePrice }) {
    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);

    const isFree = Number(packagePrice || 0) <= 0;
    const isPurchased = packageId === purchasePackge?.package;

    const handlePurchasePackage = async () => {
        if (isPurchased) return; // ইতিমধ্যে কেনা থাকলে কিছু করবে না

        if (!packageId) {
            showToast(404, "প্যাকেজ আইডি পাওয়া যায়নি!");
            return;
        }

        if (!isFree) {
            const rawData = `id=${packageId}&amount=${packagePrice}`;
            const encodedData = btoa(rawData);
            router.push(`/subAdmin/payment?payload=${encodedData}`);
            return;
        }

        try {
            setLoading(true);
            const payload = {
                method: "POST",
                api: packagePurchase,
                body: { packageId: packageId }
            };

            const { status, data } = await postActionsSubAdmin(payload);
            showToast(status, data);
            
            if(status === 200) {
                router.refresh(); // ডাটা আপডেট করার জন্য পেজ রিফ্রেশ
            }

        } catch (error) {
            console.error(error);
            showToast(500, "প্যাকেজটি অ্যাক্টিভ করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    // ডেট ফরম্যাটিং ফাংশন
    const formatDate = (dateString) => {
        if(!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("bn-BD", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Button
            onClick={handlePurchasePackage}
            disabled={loading || isPurchased}
            className={`w-full h-auto py-3 px-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-md
                ${isPurchased
                    ? "bg-green-100 text-green-700 border-2 border-green-200 cursor-not-allowed hover:bg-green-100 shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
                }
            `}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <LoadingSpinner /> <span>প্রসেসিং হচ্ছে...</span>
                </div>
            ) : isPurchased ? (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 font-bold text-base md:text-lg">
                        <span className="text-xl">✔</span> অ্যাক্টিভ করা আছে
                    </div>
                    <p className="text-[11px] md:text-xs opacity-80 mt-1">
                        ক্রয়কালঃ {formatDate(purchasePackge?.createdAt)}
                    </p>
                </div>
            ) : (
                <span className="text-base md:text-lg font-semibold">
                    {isFree ? "ফ্রি অ্যাক্টিভ করুন" : "প্যাকেজ কিনুন"}
                </span>
            )}
        </Button>
    )
}