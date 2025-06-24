"use client"

import React from 'react'
import toast from "react-hot-toast";

export default function ContactForm() {

    const handleSubmitContact = (e) => {
        e.preventDefault();
        toast.success("আপনার ম্যাসেজটি পাঠান হয়েছে!")
    }

    return (
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

    )
}
