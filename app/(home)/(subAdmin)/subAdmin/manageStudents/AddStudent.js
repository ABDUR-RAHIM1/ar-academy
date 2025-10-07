"use client"
import { postActionUser } from '@/actions/users/postActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { studentLogin } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { validateEmail } from '@/helpers/verfications';

import SubmitButton from '@/utils/SubmitButton';

import React, { useContext, useState } from 'react'
import * as XLSX from 'xlsx';

export default function AddStudent() {
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")
    const [exelData, setExelData] = useState([]);
    const [formData, setFormData] = useState({})

    // console.log(formData)

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
                    courses: ["821838123812321"],
                    role: "subStudent",
                    status: item.status || "active",
                    isSubStudent: true
                }));
                setFormData(finalData)

                setMessage("প্রশ্ন প্রস্তুত হয়েছে")
            };

            reader.readAsBinaryString(file);
        }
    };


    console.log(formData)


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
        <div>

            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg w-full  '>
                <h3 className='text-xl font-semibold text-center mb-6'>একাউন্ট তৈরী করুন</h3>



                <div className=' my-4'>
                    <Label >
                        ফাইল আপলোড  করুন (.xls/.xlsx)
                    </Label>
                    <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full ' />

                    <p className={"text-blue-500 my-2 text-sm"}>
                        <span>{formData?.questions?.length || 0} টি প্রশ্ন </span> {message}
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
