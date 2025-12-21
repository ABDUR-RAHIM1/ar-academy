"use client"
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';
import LoadingSpinner from '@/components/spinner-01';
import { Button } from '@/components/ui/button';
import { packagePurchase } from '@/constans';
import { contextD } from '@/contextApi/DashboardState'
import React, { useContext, useState } from 'react'

export default function PurchasePackageButton({ packageId }) {
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

    return (
        <Button
            // Parameter pass na kore sorasori call koro jehetu packageData scope-e ache
            onClick={handlePurchasePackage}
            disabled={loading} // Loading obosthay button disable rakha bhalo
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
            {loading ? <LoadingSpinner /> : "প্যাকেজ কিনুন"}
        </Button>
    )
}