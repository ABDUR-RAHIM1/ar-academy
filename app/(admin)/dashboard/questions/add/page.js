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
import { questionsCreate } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { getAllChapters } from '@/app/apiActions/chapters';
import { InputField } from '@/utils/InputFIled';

export default function AddQuestion() {
    const { showToast } = useContext(contextD);
    const [message, setMessage] = useState("")
    const [subCategories, setSubCategories] = useState([]);
    const [chapters, setChapters] = useState([])

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        sub_categorie: "",  //  subCategoire mean subject
        chapter: "",    // chapter mean chapterId
        isAll: "",
        isAllTitle: "",
        questions: []
    });

    console.log(formData)

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

    useEffect(() => {
        const getChapters = async () => {
            const { status, data } = await getAllChapters();
            if (status === 200) {
                // Filter chapters based on selected sub category
                const filteredChapters = data.filter(
                    chapter => chapter.sub_categorie_id === formData.sub_categorie
                );
                setChapters(filteredChapters);
            }
        };
        if (formData.sub_categorie) {
            getChapters();
        }
    }, [formData.sub_categorie]);


    const handleQuestionType = (value) => {
        if (value === "chapter") {
            setFormData((prev) => ({
                ...prev,
                isAll: false
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                isAll: true
            }))
        }
    }


    // categories Change handler
    const handleSubCategorieChange = (SubCategorieId) => {
        setFormData((prev) => ({
            ...prev,
            sub_categorie: SubCategorieId
        }))
    };
    // Chapter Change handler
    const handleSubChapterChange = (ChapterId) => {
        setFormData((prev) => ({
            ...prev,
            chapter: ChapterId // chapter mean chapterId
        }))
    };


    //  submit handler
    const handleSubmitQuestions = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            if (formData.isAll !== true && !formData?.sub_categorie) {
                return showToast(400, "একটি Subject নির্বাচন করুন");
            }

            if (formData.isAll !== true && !formData?.chapter) {
                return showToast(400, "একটি Chapter নির্বাচন করুন");
            }

            if (!formData?.questions || formData.questions.length === 0) {
                return showToast(400, "প্রশ্নগুলো Excel থেকে যোগ করতে হবে");
            }



            const payload = {
                method: "POST",
                api: questionsCreate,
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

                <div className=' my-4'>
                    <Select
                        name='questionType'
                        onValueChange={handleQuestionType}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Question Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Chapters</SelectLabel>

                                <SelectItem value="chapter">Chapter Wise</SelectItem>
                                <SelectItem value="all">All</SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


                {
                    formData.isAll &&
                    <div className=' my-4'>
                        <InputField
                            name={"isAllTitle"}
                            label={"Title"}
                            value={formData.isAllTitle}
                            placeholder={"Question All Title"}
                            handler={(e) => setFormData((prev) => ({ ...prev, isAllTitle: e.target.value }))}
                        />
                    </div>
                }

                {
                    formData.isAll !== true &&
                    <div>
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
                                            "not found"
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
                        {/*  filtered chapter (filter with sub categorie) */}
                        {
                            formData.sub_categorie &&
                            <div className=' w- my-4'>
                                <Select
                                    name='chapterId'
                                    onValueChange={handleSubChapterChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Chapter Name" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Chapters</SelectLabel>
                                            {chapters && chapters.length === 0 ? (
                                                "not found"
                                            ) : (
                                                chapters.map((ch) => (
                                                    <SelectItem key={ch._id} value={ch._id}>
                                                        {ch.identifier}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>}
                    </div>

                }


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
