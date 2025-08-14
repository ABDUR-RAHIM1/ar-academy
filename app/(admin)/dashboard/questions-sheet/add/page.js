"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { postActions } from "@/actions/admins/postActions";
import { chapterListCreate, classListCreate, questionSheetCreate, subjectListCreate } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import LoadingSpinner from "@/components/spinner-01";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllClassList } from "@/app/apiActions/classList";
import { Input } from "@/components/ui/input";
import * as XLSX from 'xlsx';
import { getSubjectByQuery } from "@/app/apiActions/subjectList";
import { getChapterByQuery } from "@/app/apiActions/chapterList";

export default function QuestionSheetAdd() {

    const router = useRouter();
    const { showToast } = useContext(contextD)
    const [isLoading, setIsLoading] = useState(false)
    const [classListData, setClassListData] = useState([]);
    const [subjectList, setSubjectList] = useState([]) // by query parameter ("classId")
    const [chapterList, setChapterList] = useState([])

    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        classId: "",
        subjectId: "",
        chapterId: "",
        questions: null
    });

    console.log(formData)
    // handleChange
    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    //  get all class List
    useEffect(() => {
        const getData = async () => {
            try {

                const { status, data } = await getAllClassList();
                if (status === 200) {
                    setClassListData(data)
                }

            } catch (error) {
                console.log("failed to get classList")
            }
        };

        getData();

    }, [])


    //  get subject based on class
    useEffect(() => {
        const getData = async () => {
            try {

                const { status, data } = await getSubjectByQuery(formData.classId);

                if (status === 200) {
                    setSubjectList(data)
                }

            } catch (error) {
                console.log("failed to get subject by queries")
            };

        }
        if (formData.classId) {
            getData();
        }
    }, [formData.classId])



    //  get chapters by queries
    useEffect(() => {
        const getData = async () => {
            try {

                const { status, data } = await getChapterByQuery(formData.subjectId);
                console.log({ status, data })
                if (status === 200) {
                    setChapterList(data)
                }

            } catch (error) {
                console.log("failed to get chapter by queries")
            };

        }
        if (formData.classId) {
            getData();
        }
    }, [formData.subjectId])


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
                setMessage("প্রশ্ন পত্র প্রস্তুত হয়েছে")
            };

            reader.readAsBinaryString(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {

            const payload = {
                method: "POST",
                api: questionSheetCreate,
                body: formData
            }
            const { status, data } = await postActions(payload)

            showToast(status, data.message)
            if (status === 200 || status === 201) {
                router.refresh
            }

        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className=" px-3 min-h-screen bg-gray-50 overflow-hidden">
            <Card className="w-full max-w-lg m-auto my-10 shadow-lg border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                        ➕ Add question sheet
                    </CardTitle>

                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Select
                                name="classId"
                                onValueChange={(value) => handleChange("classId", value)}>
                                <Label htmlFor="classes" className="text-gray-700 font-medium">
                                    ক্লাসের নাম
                                </Label>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="ক্লাস বাছাই করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>ক্লাস</SelectLabel>
                                        {
                                            classListData.map((classList, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={classList._id}
                                                >
                                                    {classList.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Select
                                name="subjectId"
                                onValueChange={(value) => handleChange("subjectId", value)}>
                                <Label htmlFor="subjectId" className="text-gray-700 font-medium">
                                    বিষয়ের নাম
                                </Label>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={
                                        subjectList && subjectList.length === 0 ? "কোন সাবজেক্ট নেই" : "বিষয় বাছাই করুন"
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>ক্লাস</SelectLabel>
                                        {
                                            subjectList?.map((subjectList, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={subjectList._id}
                                                >
                                                    {subjectList.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Select
                                name="chapterId"
                                onValueChange={(value) => handleChange("chapterId", value)}>
                                <Label htmlFor="chapterId" className="text-gray-700 font-medium">
                                    অধ্যায়
                                </Label>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={
                                        chapterList && chapterList.length === 0 ? "কোন অধ্যায় নেই" : "অধ্যায় বাছাই করুন"
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>অধ্যায়</SelectLabel>
                                        {
                                            chapterList?.map((chapter, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={chapter._id}
                                                >
                                                    {chapter.name} {" - " + chapter.title}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>



                        <div>
                            <Label htmlFor="subject" className="text-gray-700 font-medium">
                                প্রশ্ন পত্র
                            </Label>

                            <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full my-3' />
                            <small className={"text-blue-500 my-2"}>
                                {message}
                            </small>

                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                            {
                                isLoading ? <LoadingSpinner /> : "বিষয় যুক্ত করুন"
                            }
                        </Button>
                    </CardFooter>
                </form>
            </Card>

        </div>
    );
}
