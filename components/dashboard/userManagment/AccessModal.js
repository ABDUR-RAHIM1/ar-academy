"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { contextD } from '@/contextApi/DashboardState'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { postActions } from '@/actions/admins/postActions'
import LoadingSpinner from '@/components/spinner-01'
import { getAllCourse } from '@/app/apiActions/Course'
import { assignPurchasePlan } from '@/constans' // নিশ্চিত করুন এটি ইমপোর্ট করা আছে

export default function AccessModal({ showModal, setShowModal, studentId }) {
    const { showToast } = useContext(contextD);
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [fetchLoading, setFetchLoading] = useState(false) // আলাদা লোডিং স্টেট
    const [submitLoading, setSubmitLoading] = useState(false)

    // কোর্স লিস্ট লোড করা
    useEffect(() => {
        if (!showModal) return; // মডাল ওপেন না হলে ফেচ করার দরকার নেই

        const getCourses = async () => {
            setFetchLoading(true)
            try {
                const { status, data } = await getAllCourse();
                if (status === 200 || status === 201) {
                    setCourses(data);
                }
            } catch (error) {
                console.log(error)
            } finally {
                setFetchLoading(false)
            }
        };
        getCourses()
    }, [showModal])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            showToast(400, "একটি কোর্স নির্বাচন করুন");
            return;
        }

        setSubmitLoading(true)
        const dataBody = {
            studentId: studentId,
            courseId: selectedCourse
        }

        try {
            const payload = {
                method: "POST",
                api: assignPurchasePlan,
                body: dataBody 
            }
            const { status, data } = await postActions(payload);

            if (status === 200 || status === 201) {
                setShowModal(false); // সফল হলে মডাল বন্ধ করুন
                setSelectedCourse(null); // রিসেট সিলেক্টেড কোর্স
            }
            showToast(status, data)

        } catch (error) {
            console.log("failed to assign manualy course access: ", error)
            showToast(500, "এক্সেস দিতে ব্যর্থ!")
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Dialog 
            open={showModal} 
            onOpenChange={(open) => {
                if (!open) setSelectedCourse(null); // বন্ধ করার সময় ডেটা রিসেট
                setShowModal(open);
            }}
        >
            <DialogContent 
                className="sm:max-w-[425px]"
                // এaccessibility ফোকাস ইস্যু ফিক্স করার জন্য নিচের লাইনটি গুরুত্বপূর্ণ
                onOpenAutoFocus={(e) => e.preventDefault()} 
            >
                <DialogHeader>
                    <DialogTitle className="font-black text-xl">ম্যানুয়াল এনরোলমেন্ট</DialogTitle>
                    <DialogDescription className="font-medium text-slate-500">
                        ইউজারকে সরাসরি যেকোনো কোর্সে এক্সেস দিন।
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="plan" className="font-bold text-slate-700">কোর্স লিস্ট</Label>
                        <Select onValueChange={(value) => setSelectedCourse(value)} disabled={fetchLoading}>
                            <SelectTrigger className="w-full h-12 rounded-xl">
                                <SelectValue placeholder={fetchLoading ? "লোড হচ্ছে..." : "একটি কোর্স বাছাই করুন"} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl shadow-xl">
                                {courses?.length > 0 ? (
                                    courses.map(course => (
                                        <SelectItem key={course._id} value={course._id} className="cursor-pointer rounded-lg">
                                            {course.name} - <span className="font-bold text-blue-600">৳{course.offerPrice}</span>
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-sm text-slate-400 font-medium">কোর্স পাওয়া যায়নি</div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button variant="ghost" className="rounded-xl font-bold hover:bg-slate-100">বাতিল</Button>
                    </DialogClose>
                    <Button 
                        type="submit" 
                        onClick={handleSubmit} 
                        disabled={submitLoading || fetchLoading}
                        className="rounded-xl bg-slate-900 px-6 font-bold hover:bg-blue-600 transition-all min-w-[120px]"
                    >
                        {submitLoading ? <LoadingSpinner /> : "এক্সেস নিশ্চিত করুন"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}