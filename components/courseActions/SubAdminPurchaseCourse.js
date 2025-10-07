"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button' 
import { purchaseCourse } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import LoadingSpinner from '../spinner-01';
import getSubAdminToken from '@/actions/getToken/getSubAdminToken';
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';

export default function SubAdminCoursePurchaseButton({ courseId }) {

    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);


    //  submit 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await getSubAdminToken();

        if (!token) {
            showToast(404, "আপনি এখনো লগিন করেননি!")
            return
        }

        if (!courseId) {
            showToast(404, "কোর্স কিনতে ব্যর্থ!");
            return
        }
        setLoading(true)
        try {

            setLoading(true);
            const payload = {
                method: "POST",
                api: purchaseCourse,
                body: { courseId: courseId }
            }
            const { status, data } = await postActionsSubAdmin(payload)

            showToast(status, data);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }




    return (
        <Button onClick={handleSubmit} className="w-full rounded-xl bg-blue-700 hover:bg-blue-500">
            {
                loading ? <LoadingSpinner /> : "সাব এডমিন হিসেবে যুক্ত হন"
            }
        </Button>
    )
}
