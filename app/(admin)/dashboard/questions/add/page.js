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
import { getSubCategorie } from '@/app/apiActions/admin/adminApi';
import SubmitButton from '@/utils/SubmitButton';
import * as XLSX from 'xlsx';
import { Input } from '@/components/ui/input';
import { postActions } from '@/actions/admins/postActions';
import { questionsPOST_GET } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { Label } from '@/components/ui/label';

export default function AddQuestion() {
    const { showToast } = useContext(contextD);
    const [message, setMessage] = useState("")
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        sub_categorie: "",  //  subCategoire mean subject
        questions: []
    });

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
                setFormData((prev) => ({
                    ...prev,
                    questions: questionsJson
                }));
                setMessage("প্রশ্ন প্রস্তুত হয়েছে")
            };

            reader.readAsBinaryString(file);
        }
    };


    //  get all sub Categories and set for Select Field
    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getSubCategorie();

            if (status === 200 && data) {
                setSubCategories(data)
            }
        };


        getCategorieData()
    }, []);

    // categories Change handler
    const handleSubCategorieChange = (SubCategorieId) => {
        setFormData((prev) => ({
            ...prev,
            sub_categorie: SubCategorieId
        }))
    };


    //  submit handler
    const handleSubmitQuestions = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const payload = {
                method: "POST",
                api: questionsPOST_GET,
                body: formData
            }
            const { status, data } = await postActions(payload);
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
                    সাবজেক্ট অনুযায়ী প্রশ্ন যুক্ত করুন
                </h2>
                <div className=' w-full'>
                    <Select
                        name='categorieId'
                        onValueChange={handleSubCategorieChange}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Subject Name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Subjects</SelectLabel>
                                {subCategories && subCategories.length === 0 ? (
                                    "Loading . . ."
                                ) : (
                                    subCategories.map((sc) => (
                                        <SelectItem key={sc._id} value={sc._id}>
                                            {sc.sub_name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className=' my-4'>
                    <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full ' />

                    <small className={"text-blue-500 my-2"}>
                        {message}
                    </small>

                </div>


                <div onClick={handleSubmitQuestions} className=' my-5'>
                    <SubmitButton loadingState={loading} btnText={"Add Questions"} />
                </div>


            </div>

        </div>
    )
}
