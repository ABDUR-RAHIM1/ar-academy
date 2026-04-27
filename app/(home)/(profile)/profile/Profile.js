import React from 'react';
import { getUserAccount } from '@/app/apiActions/userInformantion';
import Image from 'next/image';
import { demoProfilePhoto, ogImage } from '@/Images/Images';
import ProfileNav from './ProfileNav';
import { ProfileEditButton } from '@/components/clients/profile/ProfileEditButton';
import { CalendarDays, Mail, Phone, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const Profile = async () => {
    const { status, data } = await getUserAccount();

    if (status !== 200 || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <ShieldCheck size={48} className="mb-4 opacity-20" />
                <p className="font-bold">দুঃখিত, আপনার তথ্য পাওয়া যায়নি।</p>
            </div>
        );
    }

    const { username, email, phone, photo, is_password_updated, createdAt } = data;

    const accountCreateDate = new Date(createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-6xl mx-auto px-2 md:px-0">
            {/* Profile Header Card */}
            <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border border-slate-100">

                {/* 1. Cover Photo Area */}
                <div className="relative h-44 md:h-72 w-full overflow-hidden">
                    <Image
                        src={ogImage}
                        alt="Cover Photo"
                        fill
                        priority
                        className="object-cover md:object-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* 2. Profile Info Area */}
                <div className="px-4 md:px-10 pb-2">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 gap-6 border-b border-slate-50 pb-6 relative z-10">

                        {/* Profile Picture */}
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-slate-50">
                                <Image
                                    src={photo || demoProfilePhoto}
                                    alt={username}
                                    width={176}
                                    height={176}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* User Text Info */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <h2 className="text-2xl md:text-4xl font-black text-slate-800">
                                    {username || "শিক্ষার্থীর নাম"}
                                </h2>
                                <span className="hidden md:inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100 uppercase tracking-tighter">
                                    Verified Student
                                </span>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 text-slate-500 font-medium text-sm md:text-base">
                                {email && (
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-indigo-400" />
                                        <span>{email}</span>
                                    </div>
                                )}
                                {phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-indigo-400" />
                                        <span>{phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-slate-400">
                                    <CalendarDays size={16} className="text-indigo-400" />
                                    <span>যোগ দিয়েছেন: <span className="text-slate-600">{accountCreateDate}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button: Password Updated হলেই কেবল এডিট বাটন দেখাবে */}
                        <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
                            {is_password_updated ? (
                                <ProfileEditButton user={data} />
                            ) : (
                                <div className="hidden md:block">
                                    {/* খালি রাখা হলো যাতে স্পেসিং ঠিক থাকে অথবা ছোট কোনো ব্যাজ দেওয়া যায় */}
                                </div>
                            )}
                        </div>
                    </div>



                    {!is_password_updated && (
                        <div className="mt-6 p-4 md:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border-l-[6px] border-l-amber-500">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-200 shrink-0">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <p className="text-amber-900 font-extrabold text-sm md:text-base tracking-tight">
                                        নিরাপত্তার জন্য পাসওয়ার্ড পরিবর্তন করুন!
                                    </p>

                                    <p className="text-amber-700 text-xs md:text-sm font-medium mt-1 leading-relaxed">
                                        আপনার বর্তমানে একটি ডিফল্ট পাসওয়ার্ড সেট করা আছে
                                        <span className="text-amber-900 font-bold">
                                            {phone
                                                ? " (হিন্ট: মোবাইল নম্বরের শেষ ৮টি ডিজিট)"
                                                : " (হিন্ট: ইমেইলের শুরুর অংশ + ১১২২)"
                                            }
                                        </span>।
                                        নিরাপদ থাকতে এখনই এটি পরিবর্তন করে নিন।
                                    </p>
                                </div>
                            </div>
                          
                            <ProfileEditButton user={data} />
                        </div>
                    )}

                    {/* 3. Navigation Bar */}
                    <div className="mt-4 border-t border-slate-50">
                        <ProfileNav />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;