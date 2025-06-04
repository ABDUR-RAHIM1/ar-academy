import { getSoldPlans } from "@/app/apiActions/admin/getSoldPlans";
import NoData from "@/utils/NoData";
import React from "react";
import SoldCourseChart from "./SoldCourseChart";

const SoldCourseOverview = async () => {
    const { status, data: soldPlans = [] } = await getSoldPlans();

    if (status !== 200) {
        return <NoData text={"Sold Overview not found!"} />
    }

    const totalRevenue = soldPlans.reduce((total, plan) => total + (plan.price || 0), 0);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-5xl mx-auto">
            <SoldCourseChart soldPlans={soldPlans} />
            
            <div className="mt-8 p-4 text-xl font-bold text-center rounded-lg">
                মোট আয়: {totalRevenue} টাকা
            </div>
        </div>
    );
};

export default SoldCourseOverview;
