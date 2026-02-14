"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { postActionUser } from '@/actions/users/postActions';
import { purchaseCourse } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import getToken from '@/actions/getToken/getToken';
import LoadingSpinner from '../spinner-01';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CoursePurchaseButton({ courseId, courseAmount }) {
    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);

    const isFree = Number(courseAmount) <= 0

    //  submit free course , paid hole payment page a navigate. 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await getToken();

        if (!token) {
            showToast(404, "আপনি এখনো লগিন করেননি!")
            return
        }

        if (!courseId) {
            showToast(404, "কোর্স কিনতে ব্যর্থ!");
            return
        };

        if (!isFree) {
            const rawData = `id=${courseId}&amount=${courseAmount}`;
            const encodedData = btoa(rawData);

            router.push(`/courses/payment?payload=${encodedData}`);
            return;
            return;
        }

        setLoading(true)
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
        <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`
            w-full h-14 rounded-2xl text-lg font-bold transition-all duration-300
            ${loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95"
                }
        `}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <LoadingSpinner /> {/* আপনার স্পিনার কম্পোনেন্ট */}
                    <span>প্রসেসিং হচ্ছে...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2 w-full">
                    <ShoppingCart size={20} className="animate-bounce" />
                    <span>এখনই কোর্সে যুক্ত হোন</span>
                    <ArrowRight size={18} className="ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                </div>
            )}
        </Button>
    );
}
