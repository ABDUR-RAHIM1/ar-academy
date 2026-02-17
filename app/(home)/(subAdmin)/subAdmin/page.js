import { fetchMyPackages, getAllPackages } from "@/app/apiActions/packages";
import NoData from "@/utils/NoData";
import React from "react";
import PurchasePackageButton from "./PurchasePackageButton";
import { CheckCircle2, Zap, Clock, ShieldCheck } from "lucide-react";

export default async function SubAdminPakages() {
    const { status, data: packages } = await getAllPackages();

    const purchasePackge = await fetchMyPackages();

    if (status !== 200 || !packages || packages.length === 0) {
        return <NoData text={"দুঃখিত, বর্তমানে কোনো প্যাকেজ নেই।"} />;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                    সাব-অ্যাডমিন প্যাকেজ সমূহ
                </h2>
                <div className="flex justify-center">
                    <p className="max-w-lg text-slate-500 font-medium">
                        আপনার প্রতিষ্ঠানের জন্য সঠিক প্যাকেজটি বেছে নিন এবং আধুনিক সব এডমিন ফিচারগুলো ব্যবহার শুরু করুন।
                    </p>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div
                        key={pkg._id}
                        className="group relative flex flex-col border border-slate-200 rounded-3xl p-8 bg-white shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300"
                    >
                        {/* Popular Badge (Optional logic: if price is highest or specific flag) */}
                        {pkg.price > 500 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                <Zap size={14} fill="currentColor" /> বেস্ট ভ্যালু
                            </div>
                        )}

                        <div className="mb-6 text-center">
                            <h3 className="text-2xl font-bold text-slate-800 mb-2 capitalize group-hover:text-blue-600 transition-colors">
                                {pkg.name}
                            </h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-black text-slate-900">৳{pkg.price || 0}</span>
                                <span className="text-slate-400 text-sm font-medium">/ প্যাকেজ</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8 flex-grow">
                            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                                <Clock className="text-blue-500 shrink-0" size={18} />
                                <span className="text-sm font-semibold">মেয়াদ: {pkg.duration} মাস</span>
                            </div>

                            {/* Description split logic for checkmarks */}
                            <div className="space-y-3 pt-2">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">ফিচারসমূহ</p>
                                {pkg.description?.split(",").map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                        <span>{feature.trim()}</span>
                                    </div>
                                ))}
                                {!pkg.description && (
                                    <div className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                        <span>সকল বেসিক সাব-অ্যাডমিন ফিচার</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <PurchasePackageButton
                                packageId={pkg._id} 
                                purchasePackgeId={purchasePackge?.data?.package}
                                packagePrice={pkg.price}
                            />

                            <div className="flex items-center justify-center gap-1 mt-4 text-[10px] text-slate-400 font-medium">
                                <ShieldCheck size={12} /> নিরাপদ পেমেন্ট ও ইনস্ট্যান্ট অ্যাক্সেস
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}