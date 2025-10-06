"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useEffect, useState } from 'react';

import { contextD } from '@/contextApi/DashboardState';
import { validateEmail } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { accountRegister, studentLogin } from '@/constans';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function RegisterAccount() {
    const router = useRouter();
    const { showToast, loginSignal, setLoginSignal } = useContext(contextD);


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });



    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const isEmail = validateEmail(formData.email);

            if (!isEmail) {
                showToast(400, "Invalid Email");
                return;
            }

            const payload = {
                api: accountRegister,
                method: "POST",
                body: formData
            };

            const { status, data } = await postActionUser(payload);
            showToast(status, data);
 
        } catch (error) {
            console.log(error);
            showToast(500, "Register Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
   <div className='w-full flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-r from-[#F0F4FF] to-[#E6F0FA] min-h-screen'>

  {/* Left Section */}
  <div className='bg-blue-100 hidden md:flex md:w-1/2 items-center justify-center p-10'>
    <div className='text-center max-w-sm'>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">অনুশীলন একাডেমি</h2>
      <p className='text-gray-700'>
        একাডেমিক সাফল্যের প্রথম ধাপ শুরু হোক আপনার নিজস্ব একাউন্ট থেকে। শেখা হোক আরও সহজ ও নির্ভরযোগ্য।
      </p>
    </div>
  </div>

  {/* Right Section */}
  <div className='w-full md:w-1/2  px-4 md:px-5 py-8 flex items-center justify-center'>
    <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg w-full  '>
      <h3 className='text-xl font-semibold text-center mb-6'>একাউন্ট তৈরী করুন</h3>

      <InputField name="username" label={"নাম"} placeholder="👤 আপনার নাম লিখুন" handler={handleChange} />
      <InputField name="email" type="email" label={"ইমেইল"} placeholder="📧 ইমেইল লিখুন" handler={handleChange} />
      <InputField name="password" type="password" label={"পাসওয়ার্ড"} placeholder="🔒 পাসওয়ার্ড লিখুন" handler={handleChange} />

      <SubmitButton
        loadingState={loading}
        btnText="সাইন আপ করুন"
        width={"130px"}
      />

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          একাউন্ট আছে?{" "}
          <Link
            href={studentLogin}
            className="text-blue-600 hover:underline font-medium"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>

    );
}
