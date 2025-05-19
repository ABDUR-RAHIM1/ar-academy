"use client"
import React, { useEffect, useState } from 'react'

export default function ProfileEditForm() {

    //  formData store userInfomation from localstorage
    const [formData, setFormData] = useState({
        username: "",
        email: ""
    })

    useEffect(() => {
        const userRawData = localStorage.getItem("ONUSHILON_USER_CACHE")
        if (userRawData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(userRawData))));
                setFormData(decoded)
            } catch (err) {
                console.error("Failed to decode user data:", err);
            }
        }
    }, [])


    //  onChange handler
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    console.log(formData)

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        name='username'
                        onChange={handleChange}
                        type="text"
                        value={formData.username}
                        className="w-full p-2 border border-gray-300 rounded-md"

                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        name='email'
                        onChange={handleChange}
                        type="email"
                        value={formData.email}
                        className="w-full p-2 border border-gray-300 rounded-md"

                    />
                </div>
                {/* Add more fields as needed */}
            </form>
        </div>
    )
}
