"use client"
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';
import LoadingSpinner from '@/components/spinner-01';
import { Button } from '@/components/ui/button';
import { packagePurchase } from '@/constans';
import { contextD } from '@/contextApi/DashboardState'
import React, { useContext, useState } from 'react'

export default function PurchasePackageButton({ packageId, purchasePackgeId }) {
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);

    const handlePurchasePackage = async () => {
        setLoading(true);
        try {
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
