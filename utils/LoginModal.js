import React, { useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiPhone, FiMail } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { accountSingelRegister, roles } from "@/constans";
import { validateEmail, validatePhone } from "@/helpers/verfications";
import { contextD } from "@/contextApi/DashboardState";
import Cookies from "js-cookie";
import { postActionUser } from "@/actions/users/postActions";

export function EnrollmentModal({ open, setOpen }) {
    const { showToast, setLoginSignal, setToken } = useContext(contextD);
    const [authMode, setAuthMode] = useState("register"); // 'register' or 'login'
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [localMessage, setLocalMessage] = useState("");

    const [formData, setFormData] = useState({
        accountMethod: "phone",
        username: "",
        email: "",
        phone: "",
        password: "",
        role: roles.user
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


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
                api: authMode === "register" ? accountSingelRegister : accountLogin,
                method: "POST",
                body: formData
            };

            const { status, data } = await postActionUser(payload);
            showToast(status, data);

            if (data.token) {
                setLoginSignal(prev => !prev);

                Cookies.set("onushilon_academy_session", data.token, { expires: 7 });
                setToken(data.token);
                setLocalMessage(`এখন কোর্সে যুক্ত হতে পারবেন। ধন্যবাদ `)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen} className={"mx-5"}>
            <DialogContent className="m-auto w-[95%] md:max-w-[420px] max-h-[90vh] overflow-y-auto p-5 rounded-xl ">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-800 text-center mb-4">
                        ইনফরমেশন গুলো দিয়ে কোর্সে যুক্ত হোন
                        <hr className="mt-2" />
                    </DialogTitle>
                    
                </DialogHeader>

                {/* Auth Mode Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                    <button
                        onClick={() => setAuthMode("register")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition ${authMode === "register" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"
                            }`}
                    >
                        নতুন ইউজার
                    </button>
                    <button
                        onClick={() => setAuthMode("login")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition ${authMode === "login" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"
                            }`}
                    >
                        লগইন
                    </button>
                </div>

                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">

                    {/* ১. নাম (শুধুমাত্র Register এর জন্য) */}
                    {authMode === "register" && (
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <div className="relative">
                                <Input name={"username"}
                                    onChange={handleChange}
                                    placeholder="Enter your name" className="pl-10 relative" />
                            </div>
                        </div>
                    )}

                    {/* ২. এক লাইনে মেথড এবং ইনপুট ফিল্ড */}
                    <div className="grid gap-2">
                        <Label>{formData.accountMethod === "phone" ? "Mobile Number" : "Email Address"}</Label>
                        <div className="flex gap-0 border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            {/* ছোট ড্রপডাউন */}
                            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, accountMethod: value }))} defaultValue={formData.phone}>
                                <SelectTrigger className="w-[80px] border-none bg-slate-50 rounded-none focus:ring-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="phone">
                                        <span className="flex items-center gap-2">
                                            <FiPhone />
                                            ফোন
                                        </span>
                                    </SelectItem>

                                    <SelectItem value="email">
                                        <span className="flex items-center gap-2">
                                            <FiMail />
                                            ইমেইল
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {/* ইনপুট ফিল্ড */}
                            <Input
                                name={formData.accountMethod === "email" ? "email" : "phone"}
                                type={formData.accountMethod === "email" ? "email" : "text"}
                                onChange={handleChange}
                                placeholder={formData.accountMethod === "phone" ? "017XXXXXXXX" : "example@gmail.com"}
                                className="border-none rounded-none focus-visible:ring-0 h-10"
                            />
                        </div>
                    </div>

                    {/* ৩. পাসওয়ার্ড (শুধুমাত্র Login এর জন্য) */}
                    {authMode === "login" && (
                        <div className="grid gap-2">
                            <Label>Password</Label>
                            <div className="relative">
                                <Input type="password"
                                    name={"password"}
                                    onChange={handleChange}
                                    placeholder="Enter password" className="pl-10" />
                            </div>
                        </div>
                    )}

                    {/* ৪. পাসওয়ার্ড টিপস (শুধুমাত্র Register এর জন্য) */}
                    {authMode === "register" && (
                        <div className="text-[11px] text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                            💡 Your password will be {formData.accountMethod === "phone" ? "last 8 digits of mobile" : "email username + 11122"}
                        </div>
                    )}

                    {/* সাবমিট বাটন */}
                    <Button onClick={handleSubmit} className={`w-full p-3 md:py-6 text-lg font-semibold ${authMode === "register" ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-slate-800"
                        }`}>
                        {loading ? "সংরক্ষণ করা হচ্ছে" : authMode === "register" ? "Create Account & Enroll" : "Login & Enroll"}
                    </Button>
                </div>

                {
                    localMessage &&
                    <div className=" my-5 text-center bg-blue-50 p-3 rounded-md">
                        <p className="text-blue-900"> {localMessage}</p>
                    </div>}
            </DialogContent>
        </Dialog>
    );
}