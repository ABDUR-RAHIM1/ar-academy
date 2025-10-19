"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useState } from 'react';
import { contextD } from '@/contextApi/DashboardState';
import { validateEmail } from '@/helpers/verfications';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { adminAccountLogin, roles, studentRegister, subAdminAuth } from '@/constans';
import Cookies from 'js-cookie';
import ResentEmailVerification from '@/utils/ResentEmailVerification';
import { postActions } from '@/actions/admins/postActions';

export default function LoginAccount() {
    const router = useRouter();
    const { showToast, loginSignal, setLoginSignal, setToken } = useContext(contextD);
    const [verifiedStatus, setVerifiedStatus] = useState(true)

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: roles.subAdmin
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
                api: adminAccountLogin,
                method: "POST",
                body: formData
            };

            const { status, data } = await postActions(payload);
            showToast(status, data);

            if (status === 403 && data.code === "EMAIL_NOT_VERIFIED") {
                setVerifiedStatus(false)
            }

            if (data.token) {
                setLoginSignal(prev => !prev);
                Cookies.set("onushilon_academy_sub_session", data.token, { expires: 7 });
                setToken(data.token);
                router.push("/subAdmin");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-r from-[#F0F4FF] to-[#E6F0FA] min-h-screen'>

            {/* Left Section */}
            <div className='bg-blue-100 hidden md:flex md:w-1/2 items-center justify-center p-10'>
                <div className='text-center max-w-sm'>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">SubAdmin একাউন্ট</h2>
                    <p className='text-gray-700'>
                        Assigned কোর্সের প্রশ্ন তৈরি ও স্টুডেন্টদের অ্যাক্সেস নিয়ন্ত্রণের জন্য আপনার নিজস্ব একাউন্ট ব্যবহার করুন।
                    </p>
                </div>
            </div>




            <div className='w-full md:w-1/2 px-4 md:px-10 py-8 flex items-center justify-center'>
                {/* Right Side - Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className='w-full p-6 bg-white  rounded-xl shadow-lg'
                >
                    <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>লগইন করুন</h2>

                    <div className="space-y-4">
                        <InputField name="email" type="email" placeholder="📧 আপনার ইমেইল লিখুন" handler={handleChange} />
                        <InputField name="password" type="password" placeholder="🔒 পাসওয়ার্ড লিখুন" handler={handleChange} />
                    </div>

                    <div className="mt-6">
                        <SubmitButton
                            loadingState={loading}
                            btnText="লগইন করুন"
                            width={"110px"}
                        />
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <span>একাউন্ট নেই?</span>{" "}
                        <Link
                            href={subAdminAuth}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            একাউন্ট তৈরি করুন
                        </Link>
                    </div>
                    <ResentEmailVerification verifiedStatus={verifiedStatus} email={formData.email} />
                </form>
            </div>
        </div>
    );
}
