import React from 'react';
 
import { FiGrid, FiBookOpen, FiSettings, FiUser, FiEdit } from 'react-icons/fi'; // প্রয়োজনীয় আইকনগুলো import করতে ভুলবেন না
import { getUserAccount } from '@/app/apiActions/userInformantion';
import Image from 'next/image';
import ProfileEditButton from '@/components/clients/profile/ProfileEditButton';
import PlanDetails from '@/components/clients/profile/PlanDetails';
import { gl1 } from '@/Images/Images';
import Link from 'next/link';

//  profile home page
const ProfileDashboard = async () => {

    const { status, data } = await getUserAccount();
 

    if (status !== 200 || !data) {
        return "no data found"
    }

    const { username, email, profilePhoto, createdAt, updatedAt, dob, address, mobile, favoriteSubject, qualification, instituteName, gender } = data

    // ... (Date formatting logic remains the same) ...
    const dateOfBirth = dob
        ? new Date(dob).toLocaleDateString('bn-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : "__";

    const accountCreateDate = new Date(createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const accountUpdateDate = new Date(updatedAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
   

    // মেনু আইটেম
  const menuItems = [
    { 
        name: "প্রোফাইল", 
        icon: FiUser, // বা FiGrid/FiUserCircle
        link: "/profile", // মূল /profile পাথ
        path: "",
    },
    { 
        name: "রেজাল্ট", 
        icon: FiBookOpen, 
        link: "/profile/results",
        path: "results",
    },
    { 
        name: "প্রশ্ন পত্র তৈরি করুন", 
        icon: FiEdit, // FiSettings এর বদলে FiEdit বেশি উপযুক্ত হতে পারে
        link: "/profile/make-question",
        path: "make-question",
    },
    { 
        name: "সেটিংস", 
        icon: FiSettings, 
        link: "/profile/settings",
        path: "settings",
    },
];


    return (
        <div className="max-w-6xl mx-auto">
            {/* Profile Header (Facebook Style) */}
            <div className="bg-white shadow-md rounded-xl">
                
                {/* 1. Cover Photo Area */}
                <div className="relative h-60 md:h-80 rounded-t-xl overflow-hidden z-10">
                    <Image
                        src={gl1}
                        alt="Cover Photo"
                        layout="fill"
                        // objectFit="cover"
                        className="w-full h-full"
                    />
                </div>

                {/* 2. Profile Info and Menu Bar */}
                <div className="px-4 md:px-8 pt-4 pb-2">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-16 border-b pb-4">
                        
                        {/* Profile Picture and Name/Email */}
                        <div className="flex items-end gap-6 w-full z-20">
                            <Image
                                src={profilePhoto || "https://i.pravatar.cc/100"}
                                alt="User Photo"
                                width={160}
                                height={160}
                                className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            
                            {/* User Main Info */}
                            <div className="pt-10 md:pt-4 text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-gray-900">{username || "নাম নেই"}</h2>
                                <p className="text-gray-500 text-lg">{email}</p>
                            </div>
                        </div>

                        {/* Edit Button Area */}
                        <div className="mt-4 md:mt-0 flex-shrink-0">
                            <ProfileEditButton profileInfo={data} />
                        </div>
                    </div>
                    
                    {/* 3. Navigation Menu Bar */}
                    <div className="flex justify-between md:justify-start gap-4 md:gap-8 pt-2 overflow-x-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className={`flex items-center gap-1 py-2 px-3 text-sm font-semibold border-b-2 transition-colors ${item.name === "পোস্ট" ? 'text-indigo-600 border-indigo-600' : 'text-gray-600 border-transparent hover:bg-gray-50'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content (Plan Details and Other Info) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Column (Plan Details) */}
                <div className="md:col-span-1 space-y-6">
                    <PlanDetails userId={data?._id} />

            
                </div>

                {/* Right Column (Placeholder for Posts/Activity) */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white shadow-md rounded-xl p-6 h-40 flex items-center justify-center">
                        <p className="text-gray-500">এইখানে ব্যবহারকারীর পোস্ট বা অ্যাক্টিভিটি দেখাবে।</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ProfileDashboard;