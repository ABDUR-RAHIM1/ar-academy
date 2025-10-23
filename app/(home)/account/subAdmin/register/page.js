"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useState } from 'react';

import { contextD } from '@/contextApi/DashboardState';
import { validateEmail } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { accountRegister, adminAccountregister, studentLogin, subAdminLogin } from '@/constans';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';


export default function RegisterAccount() {

  const { showToast } = useContext(contextD);
  const path = usePathname();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "subAdmin"
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
        api: adminAccountregister,
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


  const isRegister = path === "/account/subAdmin/register";


  return (
    <div className='w-full flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-r from-[#F0F4FF] to-[#E6F0FA] min-h-screen'>

      {/* Left Section */}
      <div className='bg-blue-100 hidden md:flex md:w-1/2 items-center justify-center p-10'>
        <div className='text-center max-w-sm'>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">SubAdmin একাউন্ট</h2>
          <p className='text-gray-700'>
            Assigned কোর্সের প্রশ্ন তৈরি ও স্টুডেন্টদের অ্যাক্সেস নিয়ন্ত্রণের জন্য আপনার নিজস্ব একাউন্ট ব্যবহার করুন।
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className='w-full md:w-1/2 px-4 md:px-10 py-8 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg w-full'>
          <h2 className='text-2xl font-semibold text-blue-500 mb-6 text-center'>রেজিস্টার করুন</h2>
          <div className="my-10 flex items-center justify-center gap-3 bg-gray-100 p-3 rounded-xl shadow-sm">
            {/* Login Button */}
            <Button
              asChild
              type={"button"}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 
               ${!isRegister
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
            >

              <Link href={"/account/subAdmin/login"}>
                লগইন
              </Link>
            </Button>

            {/* Register Button */}
            <Button
              type={"button"}
              asChild
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 
        ${isRegister
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
            >
              <Link href={"/account/subAdmin/register"}>
                রেজিস্টার
              </Link>
            </Button>
          </div>

          <InputField name="username" label={"ইউজার নাম"} placeholder="👤 প্রতিষ্ঠানের নাম লিখুন" handler={handleChange} />
          <InputField name="email" type="email" label={"ইমেইল"} placeholder="📧 ইমেইল লিখুন" handler={handleChange} />
          <InputField name="password" type="password" label={"পাসওয়ার্ড"} placeholder="🔒 পাসওয়ার্ড লিখুন" handler={handleChange} />
          <br />
          <SubmitButton
            loadingState={loading}
            btnText="সাইন আপ করুন"
            width={"130px"}
          />

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              একাউন্ট আছে?{" "}
              <Link
                href={subAdminLogin}
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
