"use client"
import { postActions } from '@/actions/admins/postActions';
import Heading from '@/components/clients/globals/Heading';
import LoadingSpinner from '@/components/spinner-01';
import { Button } from '@/components/ui/button';
import { courseUpdate } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { InputField } from '@/utils/InputFIled';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';


//  superAdmin Add Course 
export default function AddCourseForm({ addBy, addApi, updateApi }) {

    const { showToast, editData } = useContext(contextD);
    const path = usePathname();
    const [isLoading, setLoading] = useState(false);
    const isEditMood = Object.keys(editData).length !== 0;

    const [linkItem, setLinkItem] = useState({
        itemName: "",
        path: ""
    })


    const [formData, setFormData] = useState({
        name: "",
        title: "",
        shortDesc: "",
        description: "",
        links: [],
        regularPrice: 0,
        offerPrice: 0,
        duration: 0,
    });


    //  set Editable Data in the form State
    useEffect(() => {
        if (isEditMood) {
            setFormData(editData)
        };
    }, [editData, addBy])


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    //  handle Add Multipe Link in the form State
    const handleLinkAdd = (e) => {
        const { name, value } = e.target;

        setLinkItem((prev) => ({
            ...prev,
            [name]: value
        }))


    }

    const handleAddMultpleLinks = () => {
        setFormData((prev) => ({
            ...prev,
            links: [...prev.links, linkItem]
        }));
        setLinkItem({
            itemName: "",
            path: ""
        })
    };

    // remove previous link
    const handleRemovePreviousLinks = () => {
        setFormData((prev) => ({
            ...prev,
            links: []
        }));
        showToast(200, "আগের লিংক গুলো মুছে ফেলা হয়েছে!")
    }

    //  submit and update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const method = isEditMood ? "PUT" : "POST"
            const api = isEditMood ? updateApi + editData?._id : addApi

            const payload = {
                method: method,
                api: api,
                body: formData
            };

            // const { status, data } = await postActions(payload);
            let dataAndStatus;

            addBy === "superAdmin" ?
                (dataAndStatus = await postActions(payload))
                :
                (dataAndStatus = await postActionsSubAdmin(payload))


            showToast(dataAndStatus.status, dataAndStatus.data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className=' w-full md:w-[90%] m-auto my-10 rounded-md bg-white shadow-md border py-5 px-3 md:px-5'>
            {
                isEditMood
                    ?
                    <Heading text={"কোর্স আপডেট করুন"} /> :
                    <Heading text={"নতুন কোর্স যুক্ত করুন"} />
            }

            <form onSubmit={handleSubmit} >
                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        label={"কোর্সের নাম"}
                        type={"text"}
                        name={"name"}
                        value={formData.name}
                        required={true}
                        placeholder={"কোর্সের নাম লিখুন"}
                        handler={handleChange}
                    />
                    <InputField
                        label={"কোর্সের টাইটেল"}
                        type={"text"}
                        name={"title"}
                        value={formData.title}
                        required={true}
                        placeholder={"কোর্সের টাইটেল লিখুন"}
                        handler={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        label={"বিস্তারিত (সংক্ষেপে)"}
                        type={"textarea"}
                        name={"shortDesc"}
                        value={formData.shortDesc}
                        required={true}
                        placeholder={"কোর্সের বিস্তারিত পয়েন্ট আঁকারে কমা দিয়ে লিখুন"}
                        handler={handleChange}
                    />
                    <InputField
                        label={"বিস্তারিত (ব্যাখ্যা)"}
                        type={"textarea"}
                        name={"description"}
                        value={formData.description}
                        required={true}
                        placeholder={"কোর্সের বিস্তারিত (ব্যাখ্যা) কমা দিয়ে লিখুন"}
                        handler={handleChange}
                    />
                </div>

                {/*  লিংক সমূহ */}
                <div className='my-4 border p-2'>
                    <p className=' font-bold text-center'> {
                        formData.links?.length || 0
                    }  টি লিংক আছে</p>
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            label={"লিংকের নাম"}
                            type={"text"}
                            name={"itemName"}
                            value={linkItem.itemName}
                            required={false}
                            placeholder={"লিংকের নাম লিখুন"}
                            handler={handleLinkAdd}
                        />
                        <InputField
                            label={"লিংকের ইউআরএল"}
                            type={"text"}
                            name={"path"}
                            value={linkItem.path}
                            required={false}
                            placeholder={"লিংকের ইউআরএল দিন"}
                            handler={handleLinkAdd}
                        />
                    </div>

                    <div className=' flex items-center gap-3 flex-wrap'>
                        <Button onClick={handleAddMultpleLinks} type={"button"} className={" bg-blue-500 text-white rounded-full text-sm my-2"}>
                            যুক্ত করুন
                        </Button>
                        <Button onClick={handleRemovePreviousLinks} type={"button"} className={" bg-red-500 text-white rounded-full text-sm my-2"}>
                            আগের লিংক গুলো মুছে ফেলুন
                        </Button>
                    </div>
                </div>

                {/*  প্রাইস */}
                <div className='my-4 border p-2'>
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            label={"রেগুলার মূল্য (অপশনাল)"}
                            type={"number"}
                            name={"regularPrice"}
                            value={formData.regularPrice}
                            required={false}
                            placeholder={"রেগুলার মূল্য লিখুন"}
                            handler={handleChange}
                        />
                        <InputField
                            label={"অফার মূল্য"}
                            type={"number"}
                            name={"offerPrice"}
                            value={formData.offerPrice}
                            required={true}
                            placeholder={"মূল্য লিখুন"}
                            handler={handleChange}
                        />
                        <div className=' col-span-1'>
                            <Label htmlFor={"duration"}>  মেয়াদ  </Label>
                            <select className='w-full p-2 border rounded-md text-sm' name="duration" id="duration"
                                onChange={handleChange}
                                value={formData.duration}
                                required
                            >
                                <option value="0">কোর্সের সময়কাল বাছাই করুন</option>
                                <option value="0">আনলিমিটেড</option>
                                <option value="1">১ মাষ</option>
                                <option value="2">২ মাস</option>
                                <option value="3">৩ মাস</option>
                                <option value="4">৪ মাস</option>
                                <option value="5">৫ মাস</option>
                                <option value="6">৬ মাস</option>
                            </select>
                        </div>

                        <div className=' col-span-1'>
                            {/* <select className='w-full p-2 border rounded-md text-sm' name="courseType" id="courseType"
                                onChange={handleChange}
                                value={formData.courseType}
                                required
                            >
                                <option value="0">কে এক্সেস করতে পারবে? </option>
                                <option value="student">শিক্ষার্থী</option>
                                <option value="subAdmin">সাব অ্যাডমিন</option>
                            </select> */}
                            <Label htmlFor={"courseType"}>  কার জন্য তৈরি করেছে</Label>
                            <Input
                                name={"courseType"}
                                value={addBy === "superAdmin" ? "student" : "subAdmin"}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                    </div>

                </div>



                <Button type={"submit"} className={"w-full my-5  rounded-full bg-blue-500 text-white hover:shadow-md hover:bg-blue-700"}>
                    {
                        isLoading ? <LoadingSpinner /> : isEditMood ? "সংরক্ষন করুন" : "কোর্স  যুক্ত করুন"
                    }
                </Button>

            </form>

        </div>
    )
}
