"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useEffect, useState } from 'react';
import { contextD } from '@/contextApi/DashboardState';
import { validateEmail, validatePhone } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { usePathname, useRouter } from 'next/navigation';
import { accountLogin, roles, studentRegister } from '@/constans';
import Cookies from 'js-cookie';
import ResentEmailVerification from '@/utils/ResentEmailVerification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginAccount() {
    const router = useRouter();
    const path = usePathname();
    const { showToast, loginSignal, setLoginSignal, setToken } = useContext(contextD);
    const [verifiedStatus, setVerifiedStatus] = useState(true)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        accountMethod: "phone",
        email: "",
        phone: "",
        password: "",
        role: roles.user
    });


    // hamdle Clear FormState when change accountMethod
    useEffect(() => {

        if (formData.accountMethod === "phone") {
            setFormData((prev) => ({
                ...prev,
                email: ''
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                phone: ''
            }))
        }

    }, [formData.accountMethod])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let validMethod

            if (formData.accountMethod === "phone") {
                validMethod = validatePhone(formData.phone)
            } else {
                validMethod = validateEmail(formData.email)
            }

            if (!validMethod) {
                showToast(400, `Invalid ${formData.accountMethod === "phone" ? "Phone" : "Email"}`);
                return;
            }

            const payload = {
                api: accountLogin,
                method: "POST",
                body: formData
            };

            const { status, data } = await postActionUser(payload);
            showToast(status, data);

            if (status === 403 && data.code === "EMAIL_NOT_VERIFIED") {
                setVerifiedStatus(false)
            }

            if (data.token) {
                setLoginSignal(prev => !prev);

                Cookies.set("onushilon_academy_session", data.token, { expires: 7 });
                setToken(data.token);
                router.push("/profile");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const isLogin = path === "/account/student/login";
    return (
        <div className='w-full flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-r from-[#F0F4FF] to-[#E6F0FA] min-h-screen'>

            {/* Left Section */}
            <div className='bg-blue-100 hidden md:flex md:w-1/2 items-center justify-center p-10'>
                <div className='text-center max-w-sm'>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">অনুশীলন একাডেমি</h2>
                    <p className="text-gray-700 max-w-sm">
                        আমাদের মাধ্যমে অনুশীলন করুন এবং নিজেকে তৈরি করুন আপনার কাঙ্ক্ষিত ভবিষ্যতের জন্য।
                    </p>
                </div>
            </div>




            <div className='w-full md:w-1/2 px-4 md:px-10 py-8 flex items-center justify-center'>
                {/* Right Side - Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className='w-full p-6 bg-white  rounded-xl shadow-lg'
                >
                    <h2 className='text-2xl font-semibold text-blue-500 mb-6 text-center'>লগইন করুন</h2>
                    <div className="my-10 flex items-center justify-center gap-3 bg-gray-100 p-3 rounded-xl shadow-sm">
                        {/* Login Button */}
                        <Button
                            // onClick={() => router.push("/account/student/login")}
                            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 
                              ${isLogin
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                                }`}
                        >

                            <Link href={"/account/student/login"}>
                                লগইন
                            </Link>
                        </Button>

                        {/* Register Button */}
                        <Button
                            asChild
                            // onClick={() => router.push("/account/student/register")}
                            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 
        ${!isLogin
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                                }`}
                        >
                            <Link href={"/account/student/register"}>
                                রেজিস্টার
                            </Link>
                        </Button>
                    </div>


                    <div className="space-y-4">
                        {/* <InputField name="email" type="email" label={"ইমেইল"} placeholder="📧 আপনার ইমেইল লিখুন" handler={handleChange} /> */}
                        <div>
                            <Label>
                                {
                                    formData.accountMethod === "phone" ? "মোবাইল" : "ইমেইল"
                                }
                            </Label>
                            <div className=' flex items-center'>

                                <select name="accountMethod" id="accountMethod"
                                    onChange={handleChange}
                                    value={formData.accountMethod}
                                    className='w-[100px] border py-2 px-1 focus:outline-0 text-sm capitalize'
                                >
                                    <option value="phone">ফোন</option>
                                    <option value="email">ইমেইল</option>
                                </select>
                                <Input
                                    name={formData.accountMethod === "phone" ? "phone" : "email"}
                                    type={formData.accountMethod === "phone" ? "number" : "email"}
                                    placeholder={` ${formData.accountMethod === "phone" ? "✆ ফোন" : "✉ ইমেইল"} লিখুন `}
                                    onChange={handleChange}
                                />

                            </div>
                        </div>
                        <InputField name="password" type="password" label={"পাসওয়ার্ড"} placeholder="🔒 পাসওয়ার্ড লিখুন" handler={handleChange} />
                    </div>

                    <div className="mt-6">
                        <SubmitButton
                            loadingState={loading}
                            btnText="লগইন করুন"
                            width={"110px"}
                        />
                    </div>


                    <ResentEmailVerification verifiedStatus={verifiedStatus} email={formData.email} />
                </form>
            </div>
        </div>
    );
}
