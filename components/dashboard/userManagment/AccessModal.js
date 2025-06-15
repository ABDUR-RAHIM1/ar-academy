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
import { getAllPlans } from '@/app/apiActions/public/getAllPlan'
import { contextD } from '@/contextApi/DashboardState'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { postActions } from '@/actions/admins/postActions'
import { assignPurchasePlan } from '@/constans'
import LoadingSpinner from '@/components/spinner-01'

export default function AccessModal({ showModal, setShowModal, userId }) {
    const { showToast } = useContext(contextD);
    const [plans, setPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getPlans = async () => {
            try {
                const { status, data } = await getAllPlans();
                setPlans(data)
            } catch (error) {
                console.log(error)
            }
        };

        getPlans()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPlan) {
            showToast("প্লান প্লান নির্বাচন করুন");
            return;
        }
        setLoading(true)
        const dataBody = {
            userId: userId,
            plan: selectedPlan
        }

        try {
            const payload = {
                method: "POST",
                api: assignPurchasePlan,
                body: dataBody
            }
            const { status, data } = await postActions(payload);

            showToast(status, data)

        } catch (error) {
            console.log("failed to assign manualy course access: ", error)
            showToast(500, "এক্সেস দিতে বার্থ!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle> ম্যানুয়ালি সাবস্ক্রিপশন</DialogTitle>
                    <DialogDescription>
                        ইউজারকে ম্যানুয়ালি যেকোনো সাবস্ক্রিপশন প্ল্যানে এক্সেস দিন।
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="plan">একটি প্ল্যান বাছাই করুন</Label>
                        <Select onValueChange={(value) => setSelectedPlan(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="একটি প্ল্যান নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                {plans?.map(plan => (
                                    <SelectItem key={plan._id} value={plan}>
                                        {plan.emoji} {plan.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">বাতিল</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSubmit} style={{ width: "90px" }}>
                        {
                            loading ? <LoadingSpinner /> : "এক্সেস দিন"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
