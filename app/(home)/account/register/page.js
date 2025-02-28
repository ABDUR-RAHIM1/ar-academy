"use client"
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

export default function Account() {
    const router = useRouter()
    const { planInfo, showToast, imgUrl, uploadResponse, uploader } = useContext(contextD);

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
        profilePhoto: ""
    });


    //  Image set in the formState
    useEffect(() => {
        if (imgUrl) {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: imgUrl
            }))
        }
    }, [imgUrl])



    useEffect(() => {
        if (planInfo && Object.keys(planInfo).length > 0) {
            setFormData((prev) => ({
                ...prev,
                plan: planInfo
            }))
        }

    }, [planInfo])


    console.log(formData)
    // ইনপুট চেঞ্জ হ্যান্ডলার
    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === "file") {
            uploader(files[0])
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // স্ট্যাটাস পরিবর্তন হ্যান্ডলার (প্ল্যান আপডেট)
    const handlePlanChange = (selectedPlan) => {
        const newPlan = plans.find(p => p.plan === selectedPlan); // সিলেক্ট করা প্ল্যান খোঁজা
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
            }
            const { status, data } = await postActionUser(payload);
            showToast(status, data)

            if (data.token) {
                router.push("/profile")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-full min-h-screen px-3 bg2 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-full md:w-[45%] m-auto bg-white color1 shadow-2xl p-5 rounded-md'>
                <h3 className='text-xl my-3 font-medium text-center'>একাউন্ট তৈরী করুন</h3>

                {/* প্ল্যান সিলেক্ট */}
                <div className="my-4">
                    <Label > plan </Label>
                    <Select
                        name="plan"
                        onValueChange={handlePlanChange}
                        value={formData.plan.plan} // set default Value
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="আপনার প্ল্যান নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>প্ল্যান নির্বাচন করুন</SelectLabel>
                                {plans.map((p) => (
                                    <SelectItem key={p.plan} value={p.plan}>
                                        {p.plan} ({p.price})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <InputField name="username" placeholder="Enter Your Username" handler={handleChange} />
                <InputField name="email" type="email" placeholder="Enter Your Email" handler={handleChange} />
                <InputField name="password" type="password" placeholder="Enter Your password" handler={handleChange} />
                <InputField name="bkashNumber" type="number" placeholder="Enter Bkash Number" handler={handleChange} />
                <InputField name="amount" type="number" placeholder="Enter Bkash Amount" handler={handleChange} />

                <div className=' my-4'>
                    <Label htmlFor={"profilePhoto"} style={costomStyle} >{message || "Profile Photo"}</Label>
                    <Input
                        type={"file"}
                        name={"profilePhoto"}
                        required={false}
                        onChange={handleChange}
                    />
                </div>

                <SubmitButton loadingState={loading} btnText="সাইন আপ করুন" />

                <div className="mt-6 flex justify-center items-center">
                    <p className="text-gray-700 text-sm">
                        <span className="mr-1">একাউন্ট আছে?</span>
                        <Link
                            href="/account/login"
                            className="inline-block px-6 py-2 rounded-md bg1 text-white font-medium hover:bg2 transition-all duration-300"
                        >
                            লগইন করুন
                        </Link>
                    </p>
                </div>





            </form>
        </div>
    );
}
