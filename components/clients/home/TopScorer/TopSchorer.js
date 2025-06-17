import React from 'react';
import Heading from '../../globals/Heading';
import Image from 'next/image';
import { COMMON_ALT_TEXT } from '@/constans';

const performers = [
    { name: 'রাহাত ইসলাম', score: 98, photo: 'https://i.pravatar.cc/100?img=1' },
    { name: 'তামান্না আফরিন', score: 96, photo: 'https://i.pravatar.cc/100?img=2' },
    { name: 'সাজেদুল করিম', score: 94, photo: 'https://i.pravatar.cc/100?img=12' },
    { name: 'মাহমুদা হোসেন', score: 92, photo: 'https://i.pravatar.cc/100?img=4' },
    { name: 'নাজমুল হক', score: 91, photo: 'https://i.pravatar.cc/100?img=5' },
    { name: 'সাবরিনা আক্তার', score: 89, photo: 'https://i.pravatar.cc/100?img=6' },
    { name: 'তানভীর আহমেদ', score: 88, photo: 'https://i.pravatar.cc/100?img=7' },
    { name: 'মেহজাবিন রহমান', score: 87, photo: 'https://i.pravatar.cc/100?img=8' },
    { name: 'আরিফুল ইসলাম', score: 85, photo: 'https://i.pravatar.cc/100?img=9' },
    { name: 'রিমি সুলতানা', score: 84, photo: 'https://i.pravatar.cc/100?img=10' },
];


export default function TopScorer() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            <Heading text={"🎓 টপ পারফর্মারস"} />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {performers.map((player, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition">
                        <Image
                            src={player.photo}
                            alt={COMMON_ALT_TEXT}
                            width={150}
                            height={150}
                            className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
                        />
                        <h2 className=" text-[16px] md:text-lg font-semibold">{player.name}</h2>
                        <p className="text-gray-600">স্কোর: <span className="font-bold">{player.score}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}
