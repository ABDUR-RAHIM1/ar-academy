import React from 'react';
import { FiEdit, FiClock } from 'react-icons/fi';
import { BsPatchCheckFill } from 'react-icons/bs';
import { getUserAccount } from '@/app/apiActions/userInformantion';
import Image from 'next/image';
import Link from 'next/link';
import ExamTaken from '@/components/clients/profile/ExamTaken';
import PLanInfo from '@/components/clients/profile/PLanInfo';
import AvarageResult from '@/components/clients/profile/AvarageResult';
import SavedItems from '@/components/clients/profile/SavedItems';
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

    const { username, email, profilePhoto, createdAt, updatedAt } = data
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
            <div className="flex items-center justify-between flex-wrap gap-2 bg-white shadow-md rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                    <Image
                        src={profilePhoto || "https://i.pravatar.cc/100"}
                        alt="onushilon academy - abdur rahim"
                        width={50}
                        height={50}
                        className="w-20 h-20 rounded-full border"
                    />
                    <div>
                        <h2 className="text-xl font-bold">{username}</h2>
                        <p className="text-gray-600">{email}</p>
                        <p className="text-sm text-gray-400">Member since: {accountCreateDate}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <FiClock /> Last update: {accountUpdateDate}
                        </p>
                        <p className='text-xs text-gray-400'>
                            Account Status : <span>{data.status}</span>
                        </p>
                    </div>
                </div>
                <ProfileEditButton profileInfo={data} />

            </div>

            <PlanDetails plan={data?.plan} />

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <PLanInfo plan={data?.plan} />
                <ExamTaken />
                <AvarageResult />
            </div>

            {/* Recent Courses Progress */}
            <SavedItems />

            {/* Achievements */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="flex flex-wrap gap-3">
                    {user.achievements.map((badge, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                            <BsPatchCheckFill /> {badge}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
