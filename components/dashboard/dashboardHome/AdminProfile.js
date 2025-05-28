import React from 'react'
import { FiClock } from 'react-icons/fi'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import AdminProfileEditButton from './AdminProfileEditButton'
import { getAdminAccount } from '@/app/apiActions/admin/adminInformation'
import NoData from '@/utils/NoData'

export default async function AdminProfile() {
    const { status, data } = await getAdminAccount();

    if (status !== 200) {
        return <NoData text={"admin Information not found"} />
    }

    const { username, email, profilePhoto, createdAt, updatedAt, dob, address, mobile, favoriteSubject, qualification, instituteName, gender } = data || {};
    
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
        <div className="grid gap-6 py-8">
            {/* User Profile Card */}
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <CardTitle>অ্যাডমিন প্রোফাইল</CardTitle>
                    <AdminProfileEditButton profileInfo={data} />
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-6">
                    {/* Proile Image and Basic Info */}
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
                                <FiClock /> শেষ আপডেট: {accountUpdateDate || "—"}
                            </p>
                            <p className="text-gray-400 text-sm">
                                সদস্য হয়েছেন: {accountCreateDate || "—"}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">স্ট্যাটাস:</span>{" "}
                                <span
                                    className={`${data?.status === "active" ? "text-green-600" : "text-red-600"
                                        } font-medium`}
                                >
                                    {data?.status || "—"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">লিঙ্গ</p>
                            <p className="font-medium">
                                {!gender
                                    ? "—"
                                    : gender === "male"
                                        ? "পুরুষ"
                                        : gender === "female"
                                            ? "মহিলা"
                                            : "অন্যান্য"}
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
                </CardContent>
            </Card>
        </div>
    )
}