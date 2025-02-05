"use client"
import { contextD } from '@/contextApi/DashboardState'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

export default function SubScribeButton({ planInfoData }) {
    const router = useRouter();
    const { setPlanInfo } = useContext(contextD)

    function handleClickSubScription() {
        setPlanInfo(planInfoData);
        router.push("/account")
    }


    return (
        <button
            onClick={handleClickSubScription}
            className="btnBg ">সাবস্ক্রাইব করুন</button>
    )
}
