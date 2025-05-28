"use client"
import getToken from '@/actions/getToken/getToken';
import { postActionUser } from '@/actions/users/postActions';
import { purchasePlan, userRegister } from '@/constans';
import { contextD } from '@/contextApi/DashboardState'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

export default function SubScribeButton({ planInfoData }) {
    const router = useRouter();
    const { setPlanInfo, showToast } = useContext(contextD)
    const [loading, setLoading] = useState(false)

    async function handleClickSubScription() {
        setPlanInfo(planInfoData);

        const token = await getToken();

        if (!token) {
            showToast(404, "আপনি এখনো লগিন করেননি!")
            return
        }

        // router.push(userRegister)

        try {
            setLoading(true)

            const payload = {
                method: "POST",
                api: purchasePlan,
                body: {
                    plan: planInfoData
                }
            }

            const { status, data } = await postActionUser(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error)
            showToast(500, "failed to purchase!")

        } finally {
            setLoading(false)
        }


    }


    return (
        <button
            onClick={handleClickSubScription}
            className={`${loading ? "btnBg2" : "btnBg "} text-sm`}>
            {
                loading ? "অপেক্ষা করুন..." : " সাবস্ক্রাইব করুন"
            }
        </button>
    )
}
