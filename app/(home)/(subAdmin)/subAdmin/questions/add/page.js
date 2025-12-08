"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SubmitButton from '@/utils/SubmitButton';
import * as XLSX from 'xlsx';
import { Input } from '@/components/ui/input';
import { postActions } from '@/actions/admins/postActions';
import { questionsCreate, questionsCreateSubAdmin } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { InputField } from '@/utils/InputFIled';
import { Label } from '@/components/ui/label';
import { getAllCourse } from '@/app/apiActions/Course';
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';
import { getMyPurchaseCourseBySubAdmin } from '@/app/apiActions/purchase';


 
export default function AddQuestion() {
    const [courseLoading, setCourseLoading] = useState(false)
    const { showToast } = useContext(contextD);
    const [message, setMessage] = useState("")
    const [course, setCourse] = useState([])

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        courseId: "",
        subjectName: "",
        questions: [],
        questionType: "",
        duration: "",
        startDate: "",
        startTime: "",
        passMark: 0,
        nagetiveMark: 0,
        allowRetake: true,
        isPublished: true,
    });


     //  get only subAdmin Courses
     useEffect(() => {
         const getData = async () => {
             setCourseLoading(true)
             try {
                 const { status, data } = await getMyPurchaseCourseBySubAdmin();
            
                 if (status === 200) {
                     setCourse(data)
                 };
             } catch (error) {
                 console.log(error)
             } finally {
                 setCourseLoading(false)
             }
         };
 
         getData();
     }, [])
     
    //  handle Course Change
    const handleCourseChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            courseId: value
        }))
    }

    // Convert exel sheet to JSON 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                // Assuming the data is in the first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert the sheet data to JSON
                const questionsJson = XLSX.utils.sheet_to_json(worksheet);
                const cleanedData = questionsJson.map(({ __rowNum__, ...rest }) => rest);
                setFormData((prev) => ({
                    ...prev,
                    questions: cleanedData
                }));
                setMessage("প্রশ্ন প্রস্তুত হয়েছে")
            };

            reader.readAsBinaryString(file);
        }
    };


    const handleQuestionType = (value) => {
        setFormData((prev) => ({
            ...prev,
            questionType: value
        }))
    }

    //  handle Controller Changer 
    const handleControllChange = (e) => {
        const { name, value } = e.target;
      
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    //  submit handler
    const handleSubmitQuestions = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const payload = {
                method: "POST",
                api: questionsCreateSubAdmin,
                body: formData
            }
            const { status, data } = await postActionsSubAdmin(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error)
            showToast(500, "Failed to Add Question")
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className=' my-10'>

            <div className=' w-full md:w-[80%] m-auto bg-white p-5 rounded-md'>
                <h2 className=' text-xl font-bold my-5'>
                    প্রশ্ন যুক্ত করুন
                </h2>

                <div className=' grid grid-cols-2 gap-2'>
                    <div>
                        <Label >
                            প্রশ্নের ধরন
                        </Label>
                        <Select
                            name='questionType'
                            onValueChange={handleQuestionType}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="প্রশ্নের ধরন বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>প্রশ্নের ধরন</SelectLabel>

                                    <SelectItem value="mcq">MCQ</SelectItem>
                                    <SelectItem value="written">লিখিত</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label >
                            কোর্স
                        </Label>
                        <Select
                            name='courseId'
                            onValueChange={handleCourseChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="কোর্স বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel> {
                                         course && course?.length <= 0 ? "আপনার কোন কোর্স নেই" : "কোর্স"
                                        } </SelectLabel>

                                    {
                                        courseLoading ? <small>লোড হচ্ছে</small>
                                            :
                                            course && course.map(cItem => (
                                                <SelectItem key={cItem._id} value={cItem._id}>{cItem.name}</SelectItem>
                                            ))
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <div className='w-full'>
                    <InputField
                        name={"subjectName"}
                        value={formData.subjectName}
                        placeholder={"সাবজেক্টের নাম"}
                        label={"সাবজেক্টের নাম"}
                        handler={(e) => setFormData((prev) => ({
                            ...prev,
                            subjectName: e.target.value
                        }))}
                    />
                </div>


                {/* duration*/}
                <div className='my-4'>
                    <div className=' grid grid-cols-2 gap-2'>
                        <InputField
                            type={"date"}
                            name={"startDate"}
                            label={"পরীক্ষা শুরুর তারিখ"}
                            value={formData.startDate}
                            placeholder={"সময়সীমা"}
                            handler={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                        />
                        <InputField
                            type={"time"}
                            name={"startTime"}
                            label={"পরীক্ষার শুরুর সময়"}
                            value={formData.startTime}
                            placeholder={"সময়সীমা"}
                            handler={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                        />
                    </div>

                    <div className='grid grid-cols-3 gap-2'>
                        <InputField
                            name={"duration"}
                            label={"পরীক্ষার সময়সীমা (মিনিট)"}
                            value={formData.duration}
                            placeholder={"সময়সীমা"}
                            required={true}
                            handler={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                        />
                        <InputField
                            type={"number"}
                            name={"passMark"}
                            label={"পাশ মার্ক লিখুন"}
                            value={formData.passMark}
                            required={true}
                            placeholder={"পাশের নাম্বার"}
                            handler={(e) => setFormData((prev) => ({ ...prev, passMark: e.target.value }))}
                        />
                        <InputField
                            type={"number"}
                            name={"nagetiveMark"}
                            label={"নেগেটিভ মার্ক লিখুন"}
                            value={formData.nagetiveMark}
                            required={true}
                            placeholder={"ভুলের জন্য কাটা মার্ক লিখুন"}
                            handler={(e) => setFormData((prev) => ({ ...prev, nagetiveMark: e.target.value }))}
                        />

                    </div>

                </div>

                {/*  Controller */}
                <div className='my-3 border rounded-md p-2'>
                    <h3 className=' font-bold text-lg mb-3 capitalize'>
                        কন্ট্রোল
                    </h3>

                    <div className='grid grid-cols-2 gap-2'>

                        <div className='w-full'>
                            <label
                                htmlFor="allowRetake"
                                className="block font-medium text-sm"
                            >
                                রিটেক অনুমতি
                            </label>
                            <select
                                name="allowRetake"
                                id="allowRetake"
                                value={formData.allowRetake}
                                onChange={handleControllChange}
                                className="p-2 border rounded-md w-full text-sm"
                            >
                                <option value="">বাছাই করুন</option>
                                <option value="true">হ্যাঁ</option>
                                <option value="false">না</option>
                            </select>
                        </div>

                        <div className='w-full'>
                            <label
                                htmlFor="isPublished"
                                className="block font-medium text-sm"
                            >
                                পাবলিশ
                            </label>
                            <select
                                name="isPublished"
                                id="isPublished"
                                value={formData.isPublished}
                                onChange={handleControllChange}
                                className="p-2 border rounded-md w-full text-sm"
                            >
                                <option value="">এখনি পাবলিশ করুন</option>
                                <option value="true">হ্যাঁ</option>
                                <option value="false">না</option>
                            </select>
                        </div>


                    </div>
                </div>

                <div className=' my-4'>
                    <Label >
                        ফাইল আপলোড  করুন (.xls/.xlsx)
                    </Label>
                    <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full ' />

                    <p className={"text-blue-500 my-2 text-sm"}>
                        <span>{formData?.questions?.length || 0} টি প্রশ্ন </span> {message}
                    </p>
                </div>




                <div onClick={handleSubmitQuestions} className=' my-5 inline-block'>
                    <SubmitButton loadingState={loading} btnText={"প্রশ্ন যুক্ত করুন"} width={"120px"} />
                </div>


            </div>

        </div>
    )
}
