"use client";

import React, { useContext, useEffect, useState } from 'react';
import { CheckCircle2, Copy, Wallet, Smartphone, Check, Loader2, MessageSquare, PhoneCall, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { contextD } from '@/contextApi/DashboardState';
import { packagePurchase, purchaseCourse } from '@/constans';
import { postActionUser } from '@/actions/users/postActions';
import { useSearchParams } from 'next/navigation';
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';


// subAdmin {for Packages}
export default function ManualPaymentPage() {
    const { showToast } = useContext(contextD);
    const [selectedMethod, setSelectedMethod] = useState("bkash");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const paymentNumber = "01321040273";

    const searchParams = useSearchParams();
    const [packageInfo, setPackageInfo] = useState({ id: "", amount: "" });


    useEffect(() => {
        const payload = searchParams.get('payload');

        if (payload) {
            try {
                // ১. Base64 থেকে ডিকোড করা
                const decodedString = atob(payload); // রেজাল্ট আসবে: "id=123&amount=500"

                // ২. স্ট্রিং থেকে ডাটা আলাদা করা
                const params = new URLSearchParams(decodedString);

                setPackageInfo({
                    id: params.get('id') || "",
                    amount: params.get('amount') || ""
                });
            } catch (error) {
                console.error("Payload decoding failed:", error);
            }
        }
    }, [searchParams]);



    const [formData, setFormData] = useState({
        senderNumber: "",
        paidAmount: "",
        transactionId: "",
        method: "bkash"
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(paymentNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMethodChange = (value) => {
        setSelectedMethod(value);
        setFormData((prev) => ({
            ...prev,
            method: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                method: "POST",
                api: packagePurchase,
                body: {
                    ...formData,
                    packageId: packageInfo.id
                }
            };

            const { status, data } = await postActionsSubAdmin(payload)

            showToast(status, data);

        } catch (error) {
            console.log(error)
            showToast(500, "Payment Failed!")
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* বাম পাশ: পেমেন্ট ইন্সট্রাকশন */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-600 rounded-2xl text-white">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">পেমেন্ট করুন</h2>
                                <p className="text-sm text-slate-500 font-medium">নিচের নাম্বারে সেন্ড মানি করুন</p>
                            </div>
                        </div>

                        {/* --- নতুন যুক্ত করা অ্যামাউন্ট কার্ড --- */}
                        <div className="mb-6 p-6 bg-slate-900 rounded-[24px] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total Payable Amount</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-blue-500">৳</span>
                                    <h3 className="text-4xl font-black tracking-tighter text-white">
                                        {packageInfo.amount || "0.00"}
                                    </h3>
                                </div>
                            </div>
                            {/* ডেকোরেটিভ এলিমেন্ট */}
                            <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                                <CheckCircle2 size={60} strokeWidth={3} />
                            </div>
                        </div>
                        {/* --- অ্যামাউন্ট কার্ড শেষ --- */}

                        {/* পেমেন্ট নাম্বার সেকশন */}
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Bkash / Nagad / Rocket</p>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{paymentNumber}</h3>
                                    <p className="text-xs text-blue-500 font-bold mt-1">(Personal Number)</p>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-3 bg-white text-blue-600 rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <span className="px-3 py-1 bg-pink-100 text-pink-600 text-[10px] font-bold rounded-lg uppercase">Bkash</span>
                                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-lg uppercase">Nagad</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-600 text-[10px] font-bold rounded-lg uppercase">Rocket</span>
                            </div>
                        </div>

                        <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <h4 className="font-bold text-slate-800 text-sm mb-3">কিভাবে পেমেন্ট করবেন?</h4>
                            <ul className="text-xs text-slate-600 space-y-3">
                                <li className="flex gap-3 leading-relaxed">
                                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold italic text-[10px]">1</span>
                                    বিকাশ, নগদ বা রকেট অ্যাপ থেকে উপরে দেওয়া নাম্বারে {packageInfo.amount || "0.00"} টাকা পাঠিয়ে দিন।
                                </li>
                                <li className="flex gap-3 leading-relaxed">
                                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold italic text-[10px]">2</span>
                                    সফলভাবে সেন্ড মানি করার পর ট্রানজেকশন আইডি (TrxID) কপি করুন।
                                </li>
                                <li className="flex gap-3 leading-relaxed">
                                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold italic text-[10px]">3</span>
                                    ডানপাশের ফর্মে সঠিক তথ্য দিয়ে সাবমিট বাটনে ক্লিক করুন।
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ডান পাশ: পেমেন্ট ফর্ম */}
                <div className="bg-white p-8 lg:p-10 rounded-[32px] border border-slate-200 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* মেথড সিলেকশন */}
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                <Smartphone size={14} /> পেমেন্ট মেথড সিলেক্ট করুন
                            </Label>

                            <RadioGroup
                                defaultValue="bkash"
                                onValueChange={handleMethodChange}
                                className="grid grid-cols-3 gap-3"
                            >
                                {["bkash", "nagad", "rocket"].map((method) => (
                                    <div key={method} className="relative">
                                        <RadioGroupItem value={method} id={method} className="peer sr-only" />
                                        <Label
                                            htmlFor={method}
                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer capitalize
                                            ${selectedMethod === method
                                                    ? (method === "bkash" ? "border-pink-500 bg-pink-50 text-pink-600" :
                                                        method === "nagad" ? "border-orange-500 bg-orange-50 text-orange-600" :
                                                            "border-purple-500 bg-purple-50 text-purple-600")
                                                    : "border-slate-100 bg-white text-slate-500 hover:bg-slate-50"}`}
                                        >
                                            {selectedMethod === method && <Check size={14} className="absolute top-2 right-2" />}
                                            <span className="font-bold">{method === "bkash" ? "bKash" : method}</span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* ইনপুট ফিল্ডসমূহ */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase ml-1">সেন্ডার নাম্বার</Label>
                                <Input
                                    name="senderNumber"
                                    onChange={handleChange}
                                    placeholder="01XXXXXXXXX"
                                    required
                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase ml-1">টাকার পরিমাণ</Label>
                                <Input
                                    name="paidAmount"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="0.00"
                                    required
                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase ml-1">ট্রানজেকশন আইডি (TrxID)</Label>
                                <Input
                                    name="transactionId"
                                    onChange={handleChange}
                                    placeholder="ENTER TRXID"
                                    required
                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white uppercase placeholder:normal-case font-bold"
                                />
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" /> ভেরিফাই করা হচ্ছে...
                                </span>
                            ) : "ভেরিফাই করুন"}
                        </Button>
                    </form>
                </div>
            </div>

            {/* ফর্মের ঠিক নিচে এটি যুক্ত করুন */}
            <div className="mt-8 space-y-4">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-2xl shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="p-1 bg-amber-100 rounded-full text-amber-600 shrink-0">
                            <Info size={18} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold text-amber-900">জরুরী কিছু তথ্য:</h4>
                            <ul className="text-[12px] text-amber-800/80 space-y-1.5 leading-relaxed">
                                <li className="flex items-center gap-1.5 font-medium">
                                    • পেমেন্ট করার <b>৩০ মিনিট থেকে ২ ঘন্টার</b> মধ্যে সাধারণত ভেরিফিকেশন সম্পন্ন হয়।
                                </li>
                                <li className="flex items-center gap-1.5">
                                    • ভুল TrxID বা ভুল নাম্বার দিলে আপনার এনরোলমেন্ট বাতিল হতে পারে।
                                </li>
                                <li className="flex items-center gap-1.5">
                                    • অফিস আওয়ার (সকাল ১০টা - রাত ১০টা) এর পর পেমেন্ট করলে অ্যাপ্রুভ হতে কিছুটা সময় লাগতে পারে।
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* হেল্পলাইন সেকশন */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                            <PhoneCall size={24} className="text-blue-400 animate-pulse" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium">পেমেন্ট সংক্রান্ত যেকোনো সমস্যায়</p>
                            <h3 className="text-lg font-bold tracking-tight">+৮৮০ ১৩২১-০৪০২৭৩</h3>
                        </div>
                    </div>
                    <a
                        href="https://wa.me/8801343232179"
                        target="_blank"
                        className="w-full md:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <MessageSquare size={18} />
                        WhatsApp Message
                    </a>
                </div>
            </div>

        </div>
    );
}