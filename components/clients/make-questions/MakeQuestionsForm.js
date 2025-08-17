"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InputField } from "@/utils/InputFIled";
import QuestionSheetPreview from "./QuestionSheetPreview";

export default function MakeQuestionsForm() {

    const [showPreview, setShowPreview] = useState(false)
    //  ekhane questions array gulo add hobe 
    const [questionsSheet, setQuestionSheet] = useState([])
    const [sheetHead, setSheetHead] = useState({
        institute: "",
        examName: "",
        duration: "",
        marks: "",
        details: "",  // optional
        subject: ""
    })

    const [questionSheetForm, setQuestionSheetForm] = useState({
        ID: 1,
        Question: "",
        Option1: "",
        Option2: "",
        Option3: "",
        Option4: "",
        CorrectAnswer: "",
        Explanation: "",
    })


    const addNewQuestion = () => {
        const newQuestion = {
            ...questionSheetForm,
            ID: questionsSheet.length + 1
        };
        setQuestionSheet([...questionsSheet, newQuestion])

    };


    //  questionsSheet Head
    const handleSheetHeadChange = (e) => {
        const { name, value } = e.target;
        setSheetHead((prev) => ({
            ...prev,
            [name]: value
        }))
    };



    //  questionsSheet Main
    const handleSheetMainChange = (e) => {
        const { name, value } = e.target;
        setQuestionSheetForm((prev) => ({
            ...prev,
            [name]: value
        }))
    };


    const handleOptions = (e) => {
        const { value } = e.target;
        const optArr = value.split(",").map(item => item.trim());

        setQuestionSheetForm((prev) => {
            const updated = { ...prev };

            optArr.forEach((opt, index) => {
                updated["Option" + (index + 1)] = opt;
            });

            return updated;
        });
    };




    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-10">
            {/* Header Section */}

            <div className={"my-5"}>
                <h2>
                    প্রশ্নপত্র তৈরি করুন
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Input onChange={handleSheetHeadChange} name={"subject"} placeholder="বিষয়ঃ" />
                <Input onChange={handleSheetHeadChange} name={"duration"} placeholder="সময়ঃ (মিনিট)" />
                <Input onChange={handleSheetHeadChange} name={"marks"} placeholder="মার্কসঃ" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Input onChange={handleSheetHeadChange} name={"institute"} placeholder="ইনস্টিটিউটের নামঃ" />
                <Input onChange={handleSheetHeadChange} name={"examName"} placeholder="পরীক্ষার নামঃ" />

                <Textarea onChange={handleSheetHeadChange} name={"details"} placeholder="বিবরণঃ (ঐচ্ছিক)" className="md:col-span-2" />
            </div>


            {/* Questions Section */}
            <div className="space-y-6">

                <div className="p-5 border rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-lg">প্রশ্ন</h2>
                        <Button variant="outline" size="sm" onClick={() => console.log("Add to DB modal")}>
                            ডাটাবেজ থেকে যোগ করুন
                        </Button>
                    </div>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-2">
                        <InputField
                            name={"ID"}
                            handler={handleSheetMainChange}
                            placeholder={"Serial Number"}
                            label={"Serial Number"}

                        />
                        <InputField
                            name={"Question"}
                            handler={handleSheetMainChange}
                            placeholder={"question Text"}
                            label={"Question"}

                        />
                        <InputField
                            name={"options"}
                            handler={handleOptions}
                            placeholder={"Option1, Option2,Option3,Option4"}
                            label={"options"}

                        />
                        <InputField
                            name={"CorrectAnswer"}
                            handler={handleSheetMainChange}
                            placeholder={"Correct Answer"}
                            label={"Correct Answer"}

                        />
                    </div>
                    <div className=" my-3">
                        <Textarea
                            name={"Explanation"}
                            onChange={handleSheetMainChange}
                            placeholder={"Explanation"}
                            className={"h-[200px] w-full"}
                        />

                    </div>


                </div>


                <div className="flex justify-between mt-6">
                    <Button onClick={addNewQuestion}>নতুন প্রশ্ন যোগ করুন</Button>
                    <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
                        প্রিভিউ দেখুন
                    </Button>
                </div>
            </div>

            {
                showPreview && <QuestionSheetPreview
                    questionSheetHead={sheetHead}
                    questionSheetMain={questionSheetForm}
                    questions={questionsSheet}
                    setQuestions={setQuestionSheet}
                />
            }

        </div>
    );
}
