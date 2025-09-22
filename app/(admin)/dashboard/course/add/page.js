"use client"
import { postActions } from '@/actions/admins/postActions';
import Heading from '@/components/clients/globals/Heading';
import LoadingSpinner from '@/components/spinner-01';
import { Button } from '@/components/ui/button';
import { courseCreate } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { InputField } from '@/utils/InputFIled';
import React, { useContext, useState } from 'react'

export default function CourseAdd() {

    const { showToast } = useContext(contextD);
    const [isLoading, setLoading] = useState(false);
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
        offerPrice: 0
    });

    console.log(formData)


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
        }))
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const payload = {
                method: "POST",
                api: courseCreate,
                body: formData
            };

            const { status, data } = await postActions(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }




    return (
        <div className=' w-full md:w-[90%] m-auto my-10 rounded-md bg-white shadow-md border py-5 px-3 md:px-5'>
            <Heading text={"নতুন কোর্স যুক্ত করুন"} />

            <form onSubmit={handleSubmit} >
                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        label={"কোর্সের নাম"}
                        type={"text"}
                        name={"name"}
                        required={true}
                        placeholder={"কোর্সের নাম লিখুন"}
                        handler={handleChange}
                    />
                    <InputField
                        label={"কোর্সের টাইটেল"}
                        type={"text"}
                        name={"title"}
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
                        required={true}
                        placeholder={"কোর্সের বিস্তারিত পয়েন্ট আঁকারে কমা দিয়ে লিখুন"}
                        handler={handleChange}
                    />
                    <InputField
                        label={"বিস্তারিত (ব্যাখ্যা)"}
                        type={"textarea"}
                        name={"description"}
                        required={true}
                        placeholder={"কোর্সের বিস্তারিত (ব্যাখ্যা) কমা দিয়ে লিখুন"}
                        handler={handleChange}
                    />
                </div>

                {/*  লিংক সমূহ */}
                <div className='my-4 border p-2'>
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            label={"লিংকের নাম"}
                            type={"text"}
                            name={"itemName"}
                            required={true}
                            placeholder={"লিংকের নাম লিখুন"}
                            handler={handleLinkAdd}
                        />
                        <InputField
                            label={"লিংকের ইউআরএল"}
                            type={"text"}
                            name={"path"}
                            required={true}
                            placeholder={"লিংকের ইউআরএল দিন"}
                            handler={handleLinkAdd}
                        />
                    </div>

                    <Button onClick={handleAddMultpleLinks} type={"button"} className={" bg-blue-500 text-white rounded-full text-sm my-2"}>
                        যুক্ত করুন
                    </Button>
                </div>

                {/*  প্রাইস */}
                <div className='my-4 border p-2'>
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            label={"রেগুলার মূল্য (অপশনাল)"}
                            type={"number"}
                            name={"regularPrice"}
                            required={false}
                            placeholder={"রেগুলার মূল্য লিখুন"}
                            handler={handleChange}
                        />
                        <InputField
                            label={"অফার মূল্য"}
                            type={"number"}
                            name={"offerPrice"}
                            required={true}
                            placeholder={"মূল্য লিখুন"}
                            handler={handleChange}
                        />
                    </div>

                </div>



                <Button type={"submit"} className={"w-full my-5  rounded-full bg-blue-500 text-white hover:shadow-md hover:bg-blue-700"}>
                    {
                        isLoading ? <LoadingSpinner /> : " কোর্স  যুক্ত করুন"
                    }
                </Button>

            </form>

        </div>
    )
}
