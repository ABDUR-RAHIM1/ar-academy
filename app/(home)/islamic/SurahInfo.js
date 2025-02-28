import React from "react";

export default function SurahInfo({ surahDetails }) {
    return (
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-green-800">{surahDetails.arabicName} ({surahDetails.enTranslatedName})</h1>
            <p className="text-lg text-gray-700">{surahDetails.banglaName} | {surahDetails.englishName}</p>

            <p className="text-sm text-gray-500"> সুরা নাম্বার: {surahDetails.id} </p>

            <p className="text-sm text-gray-500">আয়াত সংখ্যা: {surahDetails.totalAyah} | স্থান: {surahDetails.enLocation === 'medinan' ? 'মাদানী' : 'মক্কী'}</p>

            {/* অডিও প্লেয়ার */}
            <audio controls className="mt-4 w-full">
                <source src={surahDetails.audio} type="audio/mpeg" />
                আপনার ব্রাউজার অডিও ফরম্যাট সমর্থন করে না।
            </audio>
        </div>
    );
}
