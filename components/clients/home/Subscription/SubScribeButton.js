"use client"
import { postActionUser } from '@/actions/users/postActions';
import { userRegister } from '@/constans';
import { contextD } from '@/contextApi/DashboardState'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

export default function SubScribeButton({ planInfoData }) {
    const router = useRouter();
    const { setPlanInfo, showToast } = useContext(contextD)
    const [loading, setLoading] = useState(false)

    async function handleClickSubScription() {
        setPlanInfo(planInfoData);
        console.log(planInfoData)
        // router.push(userRegister)

        try {
            setLoading(true)

            const payload = {
                method: "POST",
                api: "/api/purchase/create",
                body: {
                    plan: planInfoData
                }
            }

            const { status, data } = await postActionUser(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }


    }


    return (
        <button
            onClick={handleClickSubScription}
            className="btnBg ">
            {
                loading ? "Please Wait..." : " সাবস্ক্রাইব করুন"
            }
        </button>
    )
}
