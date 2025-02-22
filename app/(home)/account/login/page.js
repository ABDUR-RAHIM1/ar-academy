"use client"
import { InputField } from '@/utils/InputFIled';
import SubmitButton from '@/utils/SubmitButton';
import React, { useContext, useState } from 'react';
import { contextD } from '@/contextApi/DashboardState';
import { validateEmail } from '@/helpers/verfications';
import Link from 'next/link';
import { postActionUser } from '@/actions/users/postActions';
import { useRouter } from 'next/navigation';
import { accountLogin } from '@/constans';

export default function Account() {
    const router = useRouter()
    const { showToast } = useContext(contextD);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });



    // ইনপুট চেঞ্জ হ্যান্ডলার
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                api: accountLogin,
                method: "POST",
                body: formData
            }

            const { status, data } = await postActionUser(payload);
            showToast(status, data)

            if (data.token) {
                router.push("/profile")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-full min-h-screen px-3 bg2 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-full md:w-[45%] m-auto bg-white color1 shadow-2xl p-5 rounded-md'>
                <h3 className='text-xl my-3 font-medium text-center'>লগইন  ফর্ম </h3>


                <InputField name="email" type="email" placeholder="Enter Your Email" handler={handleChange} />
                <InputField name="password" type="password" placeholder="Enter Your password" handler={handleChange} />

                <SubmitButton loadingState={loading} btnText="লগইন করুন" />

                <div className="mt-6 flex justify-center items-center">
                    <p className="text-gray-700 text-sm">
                        <span className="mr-1">একাউন্ট নেই?</span>
                        <Link
                            href="/account/register"
                            className="inline-block px-6 py-2 rounded-md bg1 text-white font-medium hover:bg2 transition-all duration-300"
                        >
                            একাউন্ট তৈরি করুন
                        </Link>
                    </p>
                </div>





            </form>
        </div>
    );
}
