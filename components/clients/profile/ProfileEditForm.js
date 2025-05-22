"use client"
import { postActionUser } from '@/actions/users/postActions';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateUserAllInformation } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { InputField } from '@/utils/InputFIled'
import { uploaderStyle } from '@/utils/uploadStyle';
import React, { useContext, useEffect, useState } from 'react'

export default function ProfileEditForm() {
    const [loading, setLoading] = useState(false)
    const { showToast, imgUrl, uploadResponse, uploader } = useContext(contextD);

    const { status, message } = uploadResponse;
    const costomStyle = uploaderStyle(status);

    //  formData store userInfomation from localstorage
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        mobile: "",
        dob: "",
        gender: "",
        address: "",
        qualification: "",
        instituteName: "",
        favoriteSubject: "",
        profilePhoto: "",
    })


    useEffect(() => {
        const userRawData = localStorage.getItem("ONUSHILON_USER_CACHE")
        if (userRawData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(userRawData))));
                setFormData(decoded)
                console.log(41, decoded.gender)
            } catch (err) {
                console.error("Failed to decode user data:", err);
            }
        }
    }, [])

 

    useEffect(() => {
        if (imgUrl) {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: imgUrl
            }));
        }
    }, [imgUrl]);

    //  onChange handler
    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === "file") {
            uploader(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const payload = {
                method: "PUT",
                api: updateUserAllInformation + formData._id,
                body: formData
            }
            const { status, data } = await postActionUser(payload);
            showToast(status, data)


        } catch (error) {
            console.log("failed to update profile:", error)
            showToast(500, "failed to update profile")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className=" bg-gray-100 w-full min-h-screen overflow-hidden">
            <form
                onSubmit={handleUpdateProfile}
                className=" bg-white space-y-4 p-5 md:p-10 mx-4 md:mx-10  my-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    প্রোফাইল আপডেট করুন
                </h2>

                <div className='formGroup'>
                    <InputField
                        name="username"
                        label={"পুরো নাম"}
                        placeholder="পুরো নাম লিখুন"
                        value={formData.username}
                        required={false}
                        handler={handleChange}
                    />
                    <InputField
                        name="email"
                        label={"ইমেইল "}
                        type="email"
                        placeholder="ইমেইল লিখুন"
                        value={formData.email}
                        required={false}
                        handler={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <InputField
                        name="password"
                        label={"পাসওয়ার্ড"}
                        type="password"
                        placeholder="নতুন পাসওয়ার্ড সেট করুন"
                        handler={handleChange}
                        required={false}
                        value={formData.password}
                    />
                    <InputField
                        name="mobile"
                        label={"মোবাইল"}
                        type="number"
                        placeholder="মোবাইল নাম্বার"
                        value={formData.mobile}
                        required={false}
                        handler={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <InputField
                        name="dob"
                        label={"জন্ম তারিখ"}
                        type="date"
                        placeholder="জন্ম তারিখ লিখুন"
                        value={formData.dob}
                        required={false}
                        handler={handleChange}
                    />

                    <div className='w-full'>
                        <Label htmlFor={"gender"}>
                            লিঙ্গ
                        </Label>
                        <Select
                            name='gender'
                            value={formData.gender}
                            required={false}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, gender: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="লিঙ্গ বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>লিঙ্গ</SelectLabel>
                                    <SelectItem value="male">male</SelectItem>
                                    <SelectItem value="female">female</SelectItem>
                                    <SelectItem value="others">others</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <div className='formGroup'>
                    <InputField
                        name="address"
                        label={"ঠিকানা"}
                        type="text"
                        placeholder="ঠিকানা লিখুন"
                        value={formData.address}
                        required={false}
                        handler={handleChange}
                    />
                    <InputField
                        name="qualification"
                        label={"কিসে পড়াশুনা করছেন"}
                        type="text"
                        placeholder="শিক্ষাগত যোগ্যতা"
                        value={formData.qualification}
                        required={false}
                        handler={handleChange}
                    />
                </div>

                <div className='formGroup'>
                    <InputField
                        name="instituteName"
                        label={"প্রতিষ্ঠান"}
                        type="text"
                        placeholder="প্রতিষ্ঠানের নাম"
                        handler={handleChange}
                        required={false}
                        value={formData.instituteName}
                    />
                    <InputField
                        name="favoriteSubject"
                        label={"সাবজেক্ট"}
                        type="text"
                        placeholder="পছন্দের সাবজেক্ট"
                        value={formData.favoriteSubject}
                        required={false}
                        handler={handleChange}
                    />
                </div>
                <div className='my-4'>
                    <Label htmlFor={"profilePhoto"} style={costomStyle}>{message || "প্রোফাইল পিকচার"}</Label>
                    <Input type="file" name="profilePhoto" onChange={handleChange} required={false} />

                </div>


                <button type='submit' className=' my-5 py-4 px-5 bg2 text-white rounded-md'>
                    {
                        loading ? " আপডেট করা হচ্ছে..." : " আপডেট"
                    }
                </button>


            </form>
        </div>
    )
}
