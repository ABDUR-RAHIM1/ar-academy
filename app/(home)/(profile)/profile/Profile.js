import React from 'react';
import { getUserAccount } from '@/app/apiActions/userInformantion';
import Image from 'next/image';
import ProfileEditButton from '@/components/clients/profile/ProfileEditButton';
import { demoProfilePhoto, ogImage } from '@/Images/Images';
import ProfileNav from './ProfileNav';
 

//  profile home page
const Profile = async () => {

    const { status, data } = await getUserAccount();


    if (status !== 200 || !data) {
        return "no data found"
    }

    const { username, email, phone, profilePhoto, createdAt, updatedAt } = data



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
        <div className="max-w-6xl mx-auto">
            {/* Profile Header (Facebook Style) */}
            <div className="bg-white shadow-md rounded-xl">

                {/* 1. Cover Photo Area */}
                <div className="relative h-52 md:h-80 rounded-t-xl overflow-hidden z-10">
                    <Image
                        src={ogImage}
                        alt="Cover Photo"
                        layout="fill"
                        className="w-full h-full border"
                    />
                </div>

                {/* 2. Profile Info and Menu Bar */}
                <div className="px-4 md:px-8 pt-4 pb-2">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-16 border-b pb-4 ">

                        {/* Profile Picture and Name/Email */}
                        <div className="flex items-center justify-center md:justify-start flex-col md:flex-row  gap-2 md:gap-6 w-full z-20 ">
                            <Image
                                src={demoProfilePhoto}
                                alt="User Photo"
                                width={160}
                                height={160}
                                className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 mt-5 md:mt-0 border-white object-cover shadow-lg"
                            />

                            {/* User Main Info */}
                            <div className="md:pt-4 text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-gray-900">{username || "নাম নেই"}</h2>
                                <p className="text-gray-500 text-lg">{email || ""}</p>
                                <p className="text-gray-500 text-lg">{phone || ""}</p>
                            </div>
                        </div>

                        {/* Edit Button Area */}
                        <div className=" mt-4 md:mt-0 flex-shrink-0">
                            <ProfileEditButton profileInfo={data} />
                        </div>
                    </div>

                    {/* 3. Navigation Menu Bar */}
                    <ProfileNav />

                </div>
            </div>



        </div>
    );
}

export default Profile;