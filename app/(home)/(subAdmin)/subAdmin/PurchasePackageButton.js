"use client"
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';
import LoadingSpinner from '@/components/spinner-01';
import { Button } from '@/components/ui/button';
import { packagePurchase } from '@/constans';
import { contextD } from '@/contextApi/DashboardState'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function PurchasePackageButton({ packageId, purchasePackgeId, packagePrice }) {

    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);

    const isFree = Number(packagePrice || 0) <= 0

    const handlePurchasePackage = async () => {
        if (!packageId) {
            showToast(404, "কোর্স কিনতে ব্যর্থ!");
            return
        };

        if (!isFree) {
            const rawData = `id=${packageId}&amount=${packagePrice}`;
            const encodedData = btoa(rawData);

            router.push(`/subAdmin/payment?payload=${encodedData}`);
            return;
        };

        try {

            setLoading(true);
            const formData = {
                packageId: packageId
            };

            const payload = {
                method: "POST",
                api: packagePurchase,
                body: formData
            };

            const { status, data } = await postActionsSubAdmin(payload);
            showToast(status, data);

        } catch (error) {
            console.error(error);
            showToast(500, "Failed to purchase a package");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Boolean check
    const isPurchased = packageId === purchasePackgeId;

    
    return (
        <Button
            onClick={handlePurchasePackage}
            disabled={loading || isPurchased}
            className={`w-full py-2 rounded-lg text-white transition
                ${isPurchased
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
            `}
        >
            {loading
                ? <LoadingSpinner />
                : isPurchased
                    ? "✔ অ্যাক্টিভ করা আছে"
                    : "অ্যাক্টিভ করুন"
            }
        </Button>
    )
}
