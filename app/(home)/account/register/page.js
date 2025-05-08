"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useEffect, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { contextD } from '@/contextApi/DashboardState';
import { plans } from '@/LocalDatabase/Subcriptions';
import { validateEmail, validatePhone } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { accountRegister } from '@/constans';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { uploaderStyle } from '@/utils/uploadStyle';
import Cookies from 'js-cookie';

export default function RegisterAccount() {
    const router = useRouter();
    const { planInfo, showToast, imgUrl, uploadResponse, uploader, loginSignal, setLoginSignal } = useContext(contextD);

    const { status, message } = uploadResponse;
    const costomStyle = uploaderStyle(status);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        plan: {},
        username: "",
        email: "",
        password: "",
        bkashNumber: "",
        amount: "",
        institute: "",
        profilePhoto: ""
    });

    useEffect(() => {
        if (imgUrl) {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: imgUrl
            }));
        }
    }, [imgUrl]);

    useEffect(() => {
        if (planInfo && Object.keys(planInfo).length > 0) {
            setFormData((prev) => ({
                ...prev,
                plan: planInfo
            }));
        }
    }, [planInfo]);

    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === "file") {
            uploader(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePlanChange = (selectedPlan) => {
        const newPlan = plans.find(p => p.plan === selectedPlan);
        if (newPlan) {
            setFormData(prev => ({
                ...prev,
                plan: newPlan
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const isEmail = validateEmail(formData.email);
            const isPhone = validatePhone(formData.bkashNumber);

            if (!isEmail) {
                showToast(400, "Invalid Email");
                return;
            }
            if (!isPhone) {
                showToast(400, "Invalid Bkash number");
                return;
            }

            const payload = {
                api: accountRegister,
                method: "POST",
                body: formData
            };

            const { status, data } = await postActionUser(payload);
            showToast(status, data);

            if (data.token) {
                setLoginSignal(!loginSignal);
                Cookies.set("ar_academy_session", data.token);
                router.push("/profile");
            }

        } catch (error) {
            console.log(error);
            showToast(500, "Register Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#F0F4FF] to-[#E6F0FA]'>
            {/* Left Section */}
            <div className='hidden md:flex md:w-1/2 h-full flex-col items-center justify-center p-10'>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">অনুশীলন একাডেমি</h2>
                <p className='text-gray-700 text-center max-w-sm'>
                    একাডেমিক সাফল্যের প্রথম ধাপ শুরু হোক আপনার নিজস্ব একাউন্ট থেকে। শেখা হোক আরও সহজ ও নির্ভরযোগ্য।
                </p>
                {/* <img
                    src='/images/register-side.png'
                    alt='Onushilon Education'
                    className='mt-8 max-w-sm'
                /> */}
            </div>

            {/* Right Section */}
            <div className='w-full md:w-1/2 px-4 md:px-10 py-8'>
                <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg'>
                    <h3 className='text-xl font-semibold text-center mb-6'>একাউন্ট তৈরী করুন</h3>

                    <div className="mb-4">
                        <Label>প্ল্যান</Label>
                        <Select name="plan" onValueChange={handlePlanChange} value={formData.plan.plan}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="আপনার প্ল্যান নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>প্ল্যান</SelectLabel>
                                    {plans.map((p) => (
                                        <SelectItem key={p.plan} value={p.plan}>
                                            {p.plan} ({p.price})
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <InputField name="username" placeholder="Username লিখুন" handler={handleChange} />
                    <InputField name="email" type="email" placeholder="Email লিখুন" handler={handleChange} />
                    <InputField name="password" type="password" placeholder="Password লিখুন" handler={handleChange} />
                    <InputField name="bkashNumber" type="number" placeholder="Bkash Number দিন" handler={handleChange} />
                    <InputField name="amount" type="number" placeholder="Bkash Amount দিন" handler={handleChange} />
                    <InputField name="institute" type="text" placeholder="আপনার প্রতিষ্ঠানের নাম লিখুন" handler={handleChange} />

                    <div className='my-4'>
                        <Label htmlFor={"profilePhoto"} style={costomStyle}>{message || "Profile Photo"}</Label>
                        <Input type="file" name="profilePhoto" onChange={handleChange} />
                    </div>

                    <SubmitButton loadingState={loading} btnText="সাইন আপ করুন" />

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            একাউন্ট আছে?{" "}
                            <Link
                                href="/account/login"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                লগইন করুন
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
