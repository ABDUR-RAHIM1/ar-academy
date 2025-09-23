"use client"
import { postActions } from '@/actions/admins/postActions';
import { accountLogin, adminAccountLogin } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { InputField } from '@/utils/InputFIled';
import ResentEmailVerification from '@/utils/ResentEmailVerification';
import SubmitButton from '@/utils/SubmitButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';


export default function AdminLogin() {
    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [verifiedStatus, setVerifiedStatus] = useState(true)


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "superAdmin"
    })



    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const payload = {
                method: "POST",
                body: formData,
                api: adminAccountLogin
            }
            const { status, data } = await postActions(payload)
            showToast(status, data);

            if (status === 403 && data.code === "EMAIL_NOT_VERIFIED") {
                setVerifiedStatus(false)
            }

            if (data.token) {
                Cookies.set("onushilon_access", data.token);
                router.push("/dashboard")
            }
        } catch (error) {
            showToast(500, "Login failed")
        } finally {
            setLoading(false)
        }
    };


    console.log(formData)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 px-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-white/50 shadow-xl rounded-3xl p-8 space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-indigo-700 drop-shadow-sm">🔐 অ্যাডমিন লগইন</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <InputField
                            name="email"
                            type="email"
                            value={formData.email}
                            label={"ইমেইল"}
                            placeholder="📧 আপনার ইমেইল লিখুন"
                            handler={handleChange}
                        />
                        <InputField
                            name="password"
                            type="password"
                            value={formData.password}
                            label={"পাসওয়ার্ড"}
                            placeholder="🔒 পাসওয়ার্ড লিখুন"
                            handler={handleChange}
                        />
                        <select name={'role'} value={formData.role} onChange={handleChange} className='p-2 border w-full my-3 rounded-md'>
                            <option value="admin">রোল বাছাই করুন</option>
                            <option value="superAdmin">এডমিন</option>
                            <option value="moderator">মডারেটর</option>
                        </select>
                    </div>

                    <SubmitButton
                        loadingState={loading}
                        btnText={" লগইন করুন ⮞"}
                        width={"120px"}
                    />
                </form>
                <p className="text-sm text-center text-gray-500">পাসওয়ার্ড ভুলে গেছেন? <span className="text-indigo-600 hover:underline cursor-pointer">রিকভার করুন</span></p>

                <ResentEmailVerification verifiedStatus={verifiedStatus} email={formData.email} />
            </div>



        </div>
    );
}
