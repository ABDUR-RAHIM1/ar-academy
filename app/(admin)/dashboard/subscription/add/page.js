"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InputField } from "@/utils/InputFIled";
import { postActions } from "@/actions/admins/postActions";
import { createPlan } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import SubmitButton from "@/utils/SubmitButton";

export default function AddSubscription() {
    const { showToast } = useContext(contextD);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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

            const payload = {
                method: "POST",
                api: createPlan,
                body: processedData
            }

            const { status, data } = await postActions(payload);
            showToast(status, data)

        } catch (error) {
            console.log("failed to Post Plan:", error)
            showToast(500, "failed to Post Plan")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 my-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800">📝 সাবস্ক্রিপশন প্ল্যান যুক্ত করুন</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField name="key" placeholder="🔑 প্ল্যান Key (e.g. free, monthly) in English" handler={handleChange} />
                <InputField name="label" placeholder="🏷️ প্ল্যান নাম (e.g. ফ্রি প্ল্যান) In Bangla" handler={handleChange} />
                <InputField name="emoji" placeholder="😀 ইমোজি (e.g. 🆓)" handler={handleChange} />
                <InputField name="description" placeholder="📝 বর্ণনা লিখুন" handler={handleChange} />
                <InputField name="days" type="number" placeholder="📅 দিনের সংখ্যা (e.g. 30)" handler={handleChange} />
                <InputField name="price" type="number" placeholder="💵 মূল্য (e.g. 150)" handler={handleChange} />
                <Textarea
                    name="features"
                    placeholder="✅ ফিচারসমূহ কমা দিয়ে লিখুন (e.g. সকল কোর্স, লাইভ সাপোর্ট)"
                    className="w-full"
                    onChange={handleChange}
                />

                <SubmitButton loadingState={loading} btnText={"✅ যুক্ত করুন"} />
            </form>
        </div>
    );
}
