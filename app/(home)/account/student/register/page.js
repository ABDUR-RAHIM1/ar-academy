"use client";
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useEffect, useState } from 'react';
import { contextD } from '@/contextApi/DashboardState';
import { validateEmail, validatePhone } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { accountRegister } from '@/constans';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterAccount() {

  const { showToast } = useContext(contextD);
  const path = usePathname();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountMethod: "phone",
    username: "",
    email: "",
    phone: "",
    password: "",
  });


  // hamdle Clear FormState when change accountMethod
  useEffect(() => {

    if (formData.accountMethod === "phone") {
      setFormData((prev) => ({
        ...prev,
        email: ''
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        phone: ''
      }))
    }

  }, [formData.accountMethod])


  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let validMethod

      if (formData.accountMethod === "phone") {
        validMethod = validatePhone(formData.phone)
      } else {
        validMethod = validateEmail(formData.email)
      }

      if (!validMethod) {
        showToast(400, `Invalid ${formData.accountMethod === "phone" ? "Phone" : "Email"}`);
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

  const isRegister = path === "/account/student/register";

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

              <Link href={"/account/student/login"}>
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
              <Link href={"/account/student/register"}>
                রেজিস্টার
              </Link>
            </Button>
          </div>

          <InputField name="username" label={"নাম"} placeholder="👤 আপনার নাম লিখুন" handler={handleChange} />
          <div>
            <Label>
              {
                formData.accountMethod === "phone" ? "মোবাইল" : "ইমেইল"
              }
            </Label>
            <div className=' flex items-center'>

              <select name="accountMethod" id="accountMethod"
                onChange={handleChange}
                value={formData.accountMethod}
                className='w-[100px] border py-2 px-1 focus:outline-0 text-sm capitalize'
              >
                <option value="phone">ফোন</option>
                <option value="email">ইমেইল</option>
              </select>
              <Input
                name={formData.accountMethod === "phone" ? "phone" : "email"}
                type={formData.accountMethod === "phone" ? "number" : "email"}
                placeholder={` ${formData.accountMethod === "phone" ? "✆ ফোন" : "✉ ইমেইল"} লিখুন `}
                onChange={handleChange}
              />

            </div>
          </div>

          <InputField name="password" type="password" label={"পাসওয়ার্ড"} placeholder="🔒 পাসওয়ার্ড লিখুন" handler={handleChange} />

          <SubmitButton
            loadingState={loading}
            btnText="সাইন আপ করুন"
            width={"130px"}
          />


        </form>
      </div>
    </div>

  );
}
