import React from 'react';
import { FiClock } from 'react-icons/fi';
import { BsPatchCheckFill } from 'react-icons/bs';
import { getUserAccount } from '@/app/apiActions/userInformantion';
import Image from 'next/image';
import ProfileEditButton from '@/components/clients/profile/ProfileEditButton';
import PlanDetails from '@/components/clients/profile/PlanDetails';

//  profile home page
const ProfileDashboard = async () => {
    const user = {
        name: "Rahim Uddin",
        email: "rahim@example.com",
        joined: "January 2024",
        lastLogin: "May 4, 2025",
        photo: "",
        coursesBought: 5,
        examsTaken: 12,
        avgResult: 84,
        recentCourses: [
            { title: "BCS Special", progress: 75 },
            { title: "Bank Job", progress: 45 },
        ],
        achievements: ["Top Contributor", "Top Scorer"],
    };

    const { status, data } = await getUserAccount();

    if (status !== 200 || !data) {
        return "no data found"
    }

    const { username, email, profilePhoto, createdAt, updatedAt, dob, address, mobile, favoriteSubject, qualification, instituteName, gender } = data

    console.log(35, data)

    const dateOfBirth = new Date(dob).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Profile Header */}

            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    {/* Profile Info Section */}
                    <div className="flex items-start gap-6 w-full md:w-1/2">
                        <Image
                            src={profilePhoto || "https://i.pravatar.cc/100"}
                            alt="User Photo"
                            width={100}
                            height={100}
                            className="w-24 h-24 rounded-full border object-cover"
                        />
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">{username || "নাম নেই"}</h2>
                            <p className="text-gray-600">{email}</p>
                            <p className="text-gray-500 text-sm">মোবাইল: {mobile ? "0" + mobile : "—"}</p>
                            <p className="text-gray-400 text-sm">জন্ম তারিখ: {dateOfBirth || "—"}</p>
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                <FiClock /> শেষ আপডেট: {accountUpdateDate}
                            </p>
                            <p className="text-gray-400 text-sm">
                                সদস্য হয়েছেন: {accountCreateDate}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">স্ট্যাটাস:</span>{" "}
                                <span
                                    className={`${data.status === "active" ? "text-green-600" : "text-red-600"
                                        } font-medium`}
                                >
                                    {data.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">লিঙ্গ</p>
                            <p className="font-medium">
                                {!gender ? "—" : gender === "male" ? "পুরুষ" : gender === "female" ? "মহিলা" : "অন্যান্য"} 
                            </p> 
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">ঠিকানা</p>
                            <p className="font-medium">{address || "—"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">শিক্ষাগত যোগ্যতা</p>
                            <p className="font-medium">{qualification || "—"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">প্রতিষ্ঠানের নাম</p>
                            <p className="font-medium">{instituteName || "—"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">প্রিয় বিষয়</p>
                            <p className="font-medium">{favoriteSubject || "—"}</p>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end mt-6">
                    <ProfileEditButton profileInfo={data} />
                </div>
            </div>

            <PlanDetails plan={data?.plan} />

            {/* extra information add  next time */}

        </div>
    );
};

export default ProfileDashboard;
