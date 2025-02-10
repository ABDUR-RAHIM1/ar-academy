"use client"

import { InputField } from '@/utils/InputFIled'
import SubmitButton from '@/utils/SubmitButton';
import React, { useState } from 'react'

export default function Account() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(false)
        alert("এখনি ক্লিক করে লাভ নাই , কাজ চলতেছে !")
    }


    return (
        <div className=' w-full min-h-screen px-3 bg2 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=' w-full md:w-[45%] m-auto bg1 text-white shadow-2xl p-5 rounded-md'>
                <h3 className=' text-xl my-3 font-medium text-center'>একাউন্ট তৈরী করুন </h3>
                <InputField
                    name={"plan"}
                    placeholder={"Enter Your Plan"}
                    handler={handleChange}
                />
                <InputField
                    name={"username"}
                    placeholder={"Enter Your Username"}
                    handler={handleChange}
                />
                <InputField
                    name={"email"}
                    type={"email"}
                    placeholder={"Enter Your Username"}
                    handler={handleChange}
                />
                <InputField
                    name={"bkashNumber"}
                    type={"number"}
                    placeholder={"Enter Bkash Number"}
                    handler={handleChange}
                />
                <InputField
                    name={"ammount"}
                    type={"number"}
                    placeholder={"Enter Bkash ammount"}
                    handler={handleChange}
                />


                <SubmitButton loadingState={loading} btnText={"সাবমিট করুন"} />


            </form>
        </div>
    )
}
