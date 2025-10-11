"use client"
import getSubAdminToken from '@/actions/getToken/getSubAdminToken';
import { postActionUser } from '@/actions/users/postActions';
import { getMyPurchaseCourseBySubAdmin } from '@/app/apiActions/purchase';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { accountRegister, studentLogin } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { subAdminTokenDecoded } from '@/helpers/token-decoded/tokenDecoded';
import { validateEmail } from '@/helpers/verfications';

import SubmitButton from '@/utils/SubmitButton';

import React, { useContext, useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

export default function AddStudent() {
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")
    const [subAdminId, setSubAdminId] = useState(null)
    const [subAdmuinCourse, setSubAdminCourse] = useState(null);
    const [courseId, setCourseId] = useState("");
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const getData = async () => {
            const subAdmin = await subAdminTokenDecoded()
            setSubAdminId(subAdmin.id);
            const { status, data } = await getMyPurchaseCourseBySubAdmin();
            if (status === 200) {
                setSubAdminCourse(data)
            }
        };
        getData()
    }, []);

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

                const finalData = cleanedData.map((item) => ({
                    username: item.username,
                    email: item.email,
                    password: item.password,
                    isVerified: true,
                    courses: [courseId],
                    role: "subStudent",
                    status: item.status || "active",
                    owner: subAdminId
                }));
                setFormData(finalData)

                setMessage("প্রস্তুত হয়েছে")
            };

            reader.readAsBinaryString(file);
        }
    };

    console.log(courseId, formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {


            const payload = {
                api: accountRegister,
                method: "POST",
                body: formData
            };

            const { status, data } = await postActionUser(payload);
            showToast(status, data);
            console.log({ status, data })

        } catch (error) {
            console.log(error);
            showToast(500, "Register Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg w-full  '>
                <h3 className='text-xl font-semibold text-center mb-6'>একাউন্ট তৈরী করুন</h3>


                <div className=''>
                    <label htmlFor="course" className=' inline-block text-sm mb-1'>কোর্স</label>
                    <select
                        onChange={(e) => setCourseId(e.target.value)}
                        name="course" id="course" className=' w-full p-2 border  rounded-md text-sm'
                    >
                        <option value="">কোর্স নির্বাচন করুন</option>
                        {
                            subAdmuinCourse && subAdmuinCourse.map(course => (
                                <option key={course._id} value={course._id}>
                                    {course.name + " -" + course.duration + "মাস"}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className=' my-4'>
                    <Label >
                       স্টুডেন্ট ফাইল আপলোড  করুন (.xls/.xlsx)
                    </Label>
                    <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full ' />

                    <p className={"text-blue-500 my-2 text-sm"}>
                        <span>{formData?.length || 0} জন </span> {message}
                    </p>
                </div>

                <SubmitButton
                    loadingState={loading}
                    btnText="সাইন আপ করুন"
                    width={"130px"}
                />


            </form>
        </div>
    )
}
