"use client"
import { postActions } from '@/actions/admins/postActions';
import { accountRegister } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useState } from 'react';

export default function AdminLogin() {
  const { showToast } = useContext(contextD);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
    adminKey: ""
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      const payload = {
        method: "POST",
        body: formData,
        api: accountRegister
      }
      const { status, data } = await postActions(payload);
      showToast(status, data)

    } catch (error) {
      showToast(500, "Member add failed")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg rounded-3xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-purple-700 drop-shadow-sm">🔐 অ্যাডমিন যুক্ত করুন </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <InputField
              name="username"
              type="text"
              label={"নাম"}
              value={formData.username}
              placeholder="👤 নাম লিখুন লিখুন"
              handler={handleChange}
            />
            <InputField
              name="email"
              type="email"
              label={"ইমেইল"}
              value={formData.email}
              placeholder="📧 আপনার ইমেইল লিখুন"
              handler={handleChange}
            />
            <InputField
              name="password"
              type="password"
              label={"পাসওয়ার্ড"}
              value={formData.password}
              placeholder="🔑 পাসওয়ার্ড লিখুন"
              handler={handleChange}
            />
            <InputField
              name="adminKey"
              type="text"
              label={"এডমিন আইডি"}
              value={formData.adminKey}
              placeholder="🔑 এডমিন আইডি লিখুন"
              handler={handleChange}
            />
          </div>

          <div className="mt-6">
            <SubmitButton
              loadingState={loading}
              btnText="যুক্ত করুন"
              width={ "100px"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
