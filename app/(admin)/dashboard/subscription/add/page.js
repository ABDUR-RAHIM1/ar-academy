"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InputField } from "@/utils/InputFIled";
import { postActions } from "@/actions/admins/postActions";
import { createPlan, planUpdate } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import SubmitButton from "@/utils/SubmitButton";

export default function AddSubscription() {
    const { showToast, editData } = useContext(contextD);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        key: "",
        label: "",
        emoji: "",
        description: "",
        days: "",
        price: "",
        features: "",
    });

    const isEditMood = Object.keys(editData)?.length > 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    //  set EditTable Data in formData State
    useEffect(() => {
        if (isEditMood) {
            setFormData({
                ...editData,
                features: Array.isArray(editData.features) // array theke plain text
                    ? editData.features.join(", ")
                    : editData.features,
            });
        }
    }, [editData]);



    //  add/ update (conditionaly)- Plan
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const processedData = {
                ...formData,
                days: Number(formData.days),
                price: Number(formData.price),
                features: formData.features.split(",").map(f => f.trim()),
            };

            const ApiMethod = isEditMood ? "PUT" : "POST";
            const ApiKey = isEditMood ? planUpdate + formData?._id : createPlan

            const payload = {
                method: ApiMethod,
                api: ApiKey,
                body: processedData
            }

            const { status, data } = await postActions(payload);
            showToast(status, data)

        } catch (error) {
            console.log("failed:", error)
            showToast(500, "failed")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 my-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800">📝 সাবস্ক্রিপশন প্ল্যান {isEditMood ? "আপডেট" : "যুক্ত"} করুন</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField name="key" value={formData.key} placeholder="🔑 প্ল্যান Key (e.g. free, monthly) in English" handler={handleChange} />
                <InputField name="label" value={formData.label} placeholder="🏷️ প্ল্যান নাম (e.g. ফ্রি প্ল্যান) In Bangla" handler={handleChange} />
                <InputField name="emoji" value={formData.emoji} placeholder="😀 ইমোজি (e.g. 🆓)" handler={handleChange} />
                <InputField name="description" value={formData.description} placeholder="📝 বর্ণনা লিখুন" handler={handleChange} />
                <InputField name="days" type="number" value={formData.days} placeholder="📅 দিনের সংখ্যা (e.g. 30)" handler={handleChange} />
                <InputField name="price" type="number" value={formData.price} placeholder="💵 মূল্য (e.g. 150)" handler={handleChange} />
                <Textarea
                    name="features"
                    placeholder="✅ ফিচারসমূহ কমা দিয়ে লিখুন (e.g. সকল কোর্স, লাইভ সাপোর্ট)"
                    className="w-full"
                    value={formData.features}
                    onChange={handleChange}
                />

                <SubmitButton loadingState={loading} btnText={isEditMood ? "✅ আপডেট করুন" : "✅ যুক্ত করুন"} />
            </form>
        </div>
    );
}
