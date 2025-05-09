"use client"
import React from "react";
import toast from "react-hot-toast";

const ContactPage = () => {

    const handleSubmitContact = (e) => {
        e.preventDefault();
        toast.success("আপনার ম্যাসেজটি পাঠান হয়েছে!")
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-blue-700 mb-8">Contact Us</h2>

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl p-8">
                {/* Contact Form */}
                <form onSubmit={handleSubmitContact} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Name</label>
                        <input type="text" placeholder="Your Name" required className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Email</label>
                        <input type="email" placeholder="Your Email" required className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Message</label>
                        <textarea rows="5" required placeholder="Write your message..." className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-300">
                        Send Message
                    </button>
                </form>

                {/* Contact Info in Bengali */}
                <div className="flex flex-col justify-center space-y-4 text-gray-700">
                    <h3 className="text-2xl font-bold text-blue-700">যোগাযোগ করুন</h3>
                    <p>আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন। নিচের তথ্য ব্যবহার করেও যোগাযোগ করতে পারেন।</p>
                    <div>
                        <p className="font-semibold">📞 ফোন:</p>
                        <p>+৮৮০ ০১৩২১০৪০২৭৩</p>
                    </div>
                    <div>
                        <p className="font-semibold">📧 ইমেইল:</p>
                        <p>onushilonac@gmail.com</p>
                    </div>
                    <div>
                        <p className="font-semibold">📍 ঠিকানা:</p>
                        <p>ঢাকা, বাংলাদেশ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
