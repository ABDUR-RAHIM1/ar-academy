"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useState } from 'react';
import { contextD } from '@/contextApi/DashboardState';
import { validateEmail } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { useRouter } from 'next/navigation';
import { accountLogin } from '@/constans';
import Cookies from 'js-cookie';

export default function LoginAccount() {
    const router = useRouter();
    const { showToast, loginSignal, setLoginSignal } = useContext(contextD);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const isEmail = validateEmail(formData.email);
            if (!isEmail) {
                showToast(400, "Invalid Email");
                return;
            }

            const payload = {
                api: accountLogin,
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F9FAFB] to-[#EFF6FF] flex items-center justify-center px-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                
                {/* Left Side - Branding */}
                <div className="bg-blue-100 p-10 flex flex-col justify-center items-center text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">অনুশীলন একাডেমি</h2>
                    <p className="text-gray-700 max-w-sm">
                        আমাদের মাধ্যমে অনুশীলন করুন এবং নিজেকে তৈরি করুন আপনার কাঙ্ক্ষিত ভবিষ্যতের জন্য।
                    </p>
                    {/* <img 
                        src="" 
                        alt="Login Illustration" 
                        className="w-60 mt-6 hidden md:block"
                    /> */}
                </div>

                {/* Right Side - Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className='w-full p-10'
                >
                    <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>লগইন করুন</h2>

                    <div className="space-y-4">
                        <InputField name="email" type="email" placeholder="আপনার ইমেইল লিখুন" handler={handleChange} />
                        <InputField name="password" type="password" placeholder="পাসওয়ার্ড লিখুন" handler={handleChange} />
                    </div>

                    <div className="mt-6">
                        <SubmitButton loadingState={loading} btnText="লগইন করুন" />
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <span>একাউন্ট নেই?</span>{" "}
                        <Link
                            href="/account/register"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            একাউন্ট তৈরি করুন
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
