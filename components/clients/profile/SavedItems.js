import React from 'react';

export default function SavedItems() {
    const savedItems = [
        { itemName: 'Categories', title: 'বইসমূহ', savedDate: '১২ মে ২০২৫' },
        { itemName: 'SubCategory', title: 'বাংলা ব্যাকরণ', savedDate: '১৩ মে ২০২৫' },
        { itemName: 'Chapter', title: 'বাংলাদেশ বিষয়াবলী - অধ্যায় ১', savedDate: '১৪ মে ২০২৫' },
        { itemName: 'Chapter', title: 'সাধারণ বিজ্ঞান - অধ্যায় ৩', savedDate: '১৫ মে ২০২৫' },
        { itemName: 'Categories', title: 'চাকরি প্রস্তুতি', savedDate: '১৬ মে ২০২৫' },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">সংরক্ষিত আইটেমসমূহ</h2>

            <div className="grid md:grid-cols-2 gap-5">
                {savedItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition border-l-4 
                        border-blue-500">
                        <p className="text-sm text-gray-500">ধরন: {item.itemName}</p>
                        <h3 className="text-lg font-semibold text-gray-800 mt-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">সংরক্ষণ তারিখ: {item.savedDate}</p>
                        <button className="mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">
                            মুছে ফেলুন
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
