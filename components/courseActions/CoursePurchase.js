"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { postActionUser } from '@/actions/users/postActions';
import { purchaseCourse } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import getToken from '@/actions/getToken/getToken';
import LoadingSpinner from '../spinner-01';

export default function CoursePurchaseButton({ courseId }) {

    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);


    //  submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const token = await getToken();

        if (!token) {
            showToast(404, "আপনি এখনো লগিন করেননি!")
            return
        }

        if (!courseId) {
            showToast(404, "কোর্স কিনতে ব্যর্থ!");
            return
        }

        try {

            setLoading(true);
            const payload = {
                method: "POST",
                api: purchaseCourse,
                body: { courseId: courseId }
            }
            const { status, data } = await postActionUser(payload)

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
                loading ? <LoadingSpinner /> : " এখনই কোর্সটি কিনুন"
            }
        </Button>
    )
}
