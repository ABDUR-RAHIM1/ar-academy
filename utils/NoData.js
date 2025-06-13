import React from 'react';

export default function NoData({ text }) {
    return (
        <div className='p-4 w-full min-h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-lg px-8 py-10 text-center max-w-md animate-fadeUp'>
                
                {/* Icon or Emoji */}
                <div className="text-5xl animate-bounce">😞</div>

                {/* Message */}
                <div className="text-xl font-semibold">
                    {text || "এখানে কোন তথ্য পাওয়া যায়নি!"}
                </div>
            </div>
        </div>
    );
}
