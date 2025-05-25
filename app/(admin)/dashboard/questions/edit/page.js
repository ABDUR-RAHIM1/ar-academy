"use client";
import React, { useContext, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getSubCategorie } from "@/app/apiActions/admin/adminApi";
import SubmitButton from "@/utils/SubmitButton";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { postActions } from "@/actions/admins/postActions";
import { questionUpdate } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import { Label } from "@/components/ui/label";

export default function EditQuestion() {
    const { showToast, editData } = useContext(contextD);
    const [message, setMessage] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        sub_categorie: "",  //  subCategoire mean subject
        chapter: "",    // chapter mean chapterId
        isAll: "",
        isAllTitle: "",
        questions: []
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                sub_categorie: editData?.sub_categorie?._id || "",
                questions: [],
            });
        }
    }, [editData]);

    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getSubCategorie();
            if (status === 200 && data) {
                setSubCategories(data);
            }
        };
        getCategorieData();
    }, []);

    const handleSubCategorieChange = (subId) => {
        setFormData((prev) => ({
            ...prev,
            sub_categorie: subId,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const questionsJson = XLSX.utils.sheet_to_json(worksheet);
                const cleanedData = questionsJson.map(({ __rowNum__, ...rest }) => rest);

                setFormData((prev) => ({
                    ...prev,
                    questions: cleanedData,
                }));
                setMessage(`প্রশ্ন প্রস্তুত হয়েছে (${cleanedData.length} টি প্রশ্ন)`);
            };

            reader.readAsBinaryString(file);
        }
    };

    const handleUpdateQuestions = async (e) => {
        e.preventDefault();
        if (!formData.questions.length) {
            showToast(400, "প্রশ্ন ফাইল যুক্ত করুন");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                method: "PUT",
                api: questionUpdate + editData?._id,
                body: formData,
            };
            const { status, data } = await postActions(payload);
            showToast(status, data);
        } catch (error) {
            console.log(error);
            showToast(500, "Failed to update question");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-10">
            <div className="w-full md:w-[80%] m-auto bg-white p-5 rounded-md">
                <h2 className="text-xl font-bold my-5">সাবজেক্ট অনুযায়ী প্রশ্ন আপডেট করুন</h2>

                <div className="my-4 w-full">
                    <Label>পূর্বের সাবজেক্ট</Label>
                    <Input value={editData?.sub_categorie?.sub_name || "N/A"} disabled />
                </div>

                <div className="w-full mb-4">
                    <Label>নতুন সাবজেক্ট (যদি পরিবর্তন করতে চান)</Label>
                    <Select value={formData.sub_categorie} onValueChange={handleSubCategorieChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select New Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Subjects</SelectLabel>
                                {subCategories.length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
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

                <div className="my-4">
                    <Label>এক্সেল ফাইল (.xlsx / .xls)</Label>
                    <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className="w-full" />
                    {message && <small className="text-green-600">{message}</small>}
                </div>

                <div onClick={handleUpdateQuestions} className="my-5">
                    <SubmitButton loadingState={loading} btnText={"Update Questions"} />
                </div>
            </div>
        </div>
    );
}
