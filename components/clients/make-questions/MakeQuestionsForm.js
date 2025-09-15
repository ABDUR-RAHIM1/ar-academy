"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InputField } from "@/utils/InputFIled";
import QuestionSheetPreview from "./QuestionSheetPreview";
import { Label } from "@/components/ui/label";
import DatabaseQuestionModal from "./QuestionModal";
import { EyeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        subject: "",
        fontSize: "",
        type: "bangla",
        questionFormat: "mcq",
        isExplanation: "no",
        isDeleteButton: "no"
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
        QuestionMark: ""
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
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-lg my-10">
            {/* Header Section */}

            <div className={"my-5"}>
                <h2>
                    প্রশ্নপত্র তৈরি করুন
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <InputField
                    handler={handleSheetHeadChange}
                    name={"subject"}
                    placeholder="বিষয়ঃ"
                    label={"বিষয়ঃ"}
                />
                <InputField
                    handler={handleSheetHeadChange}
                    name={"duration"}
                    placeholder="সময়ঃ (মিনিট)"
                    label={"মোট সময়"}
                />
                <InputField
                    handler={handleSheetHeadChange}
                    name={"marks"}
                    placeholder="মার্কসঃ"
                    label={"মার্কসঃ"}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 m-0">
                <InputField
                    handler={handleSheetHeadChange}
                    name={"institute"}
                    placeholder="ইনস্টিটিউটের নামঃ"
                    label={"ইনস্টিটিউটের নাম"}
                />
                <InputField
                    handler={handleSheetHeadChange}
                    name={"examName"}
                    placeholder="পরীক্ষার নামঃ"
                    label={"পরীক্ষার নাম"}
                />

            </div>

            <div className=" my-2">
                <Label className={"mb-2"}>বিবরণঃ (ঐচ্ছিক)</Label>
                <Textarea onChange={handleSheetHeadChange} name={"details"} placeholder="বিবরণঃ (ঐচ্ছিক)" className="md:col-span-2" />
            </div>

            {/*  utilities */}
            <div className=" my-3 p-2 md:p-5 border rounded-2xl shadow-sm">
                <h2 className=" font-bold my-2 text-sm">ফরম্যাট</h2>
                <div className=" grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">ফন্ট সাইজ</label>
                        <Select onValueChange={(value) => handleSheetHeadChange({ target: { name: "fontSize", value } })}>
                            <SelectTrigger>
                                <SelectValue placeholder="ফন্ট সাইজ নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10px">10 px</SelectItem>
                                <SelectItem value="11px">11 px</SelectItem>
                                <SelectItem value="12px">12 px</SelectItem>
                                <SelectItem value="13px">13 px</SelectItem>
                                <SelectItem value="14px">14 px</SelectItem>
                                <SelectItem value="15px">15 px</SelectItem>
                                <SelectItem value="16px">16 px</SelectItem>
                                <SelectItem value="18px">18 px</SelectItem>
                                <SelectItem value="20px">20 px</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ধরন</label>
                        <Select onValueChange={(value) => handleSheetHeadChange({ target: { name: "type", value } })}>
                            <SelectTrigger>
                                <SelectValue placeholder="ধরন নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bangla">বাংলা</SelectItem>
                                <SelectItem value="english">ইংরেজি</SelectItem>
                                <SelectItem value="math">গণিত</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">প্রশ্নের ধরন</label>
                        <Select
                            onValueChange={(value) =>
                                handleSheetHeadChange({ target: { name: "questionFormat", value } })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="MCQ / Written" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mcq">MCQ</SelectItem>
                                <SelectItem value="written">Written</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">উত্তরসহ ব্যাখ্যা</label>
                        <Select
                            onValueChange={(value) =>
                                handleSheetHeadChange({ target: { name: "isExplanation", value } })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="উত্তরসহ ব্যাখ্যা দেখা" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">হ্যাঁ</SelectItem>
                                <SelectItem value="no">না</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">প্রশ্নের ডিলিট</label>
                        <Select
                            onValueChange={(value) =>
                                handleSheetHeadChange({ target: { name: "isDeleteButton", value } })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="প্রশ্ন ডিলিট করবেন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">হ্যাঁ</SelectItem>
                                <SelectItem value="no">না</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>


            {/* Questions Section */}
            <div className="space-y-6">

                <div className="p-5 border rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-lg">প্রশ্ন</h2>
                        <DatabaseQuestionModal
                            setQuestionSheet={setQuestionSheet}
                            questionType={sheetHead.type}
                        />
                    </div>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-2">


                        {
                            sheetHead.questionFormat === "mcq" ?
                                <div className="mt-2">
                                    <Label className={"text-red-500"}>মার্কস (শুধুমাত্র লিখিত পরিক্ষার জন্য প্রযোজ্য) </Label>
                                    <Input
                                        disabled
                                        placeholder={"প্রশ্ন প্রতি মার্কস"}
                                    />
                                </div>
                                :
                                <InputField
                                    name={"QuestionMark"}
                                    handler={handleSheetMainChange}
                                    placeholder={"প্রশ্ন প্রতি মার্কস"}
                                    label={"মার্কস"}
                                    value={sheetHead.QuestionMark}
                                />
                        }

                        <InputField
                            name={"Question"}
                            handler={handleSheetMainChange}
                            placeholder={"এখানে প্রশ্ন লিখুন"}
                            label={"প্রশ্ন"}

                        />
                        <InputField
                            name={"options"}
                            handler={handleOptions}
                            placeholder={"প্রতিটি কমা দিয়ে লিখুন"}
                            label={"অপশন গুলো"}

                        />
                        <InputField
                            name={"CorrectAnswer"}
                            handler={handleSheetMainChange}
                            placeholder={"সঠিক উত্তর"}
                            label={"সঠিক উত্তর টি এখানে লিখুন"}

                        />
                    </div>
                    <div className=" my-3">
                        <Label className={"mb-2"}>
                            ব্যাখ্যা
                        </Label>
                        <Textarea
                            name={"Explanation"}
                            onChange={handleSheetMainChange}
                            placeholder={"উত্তরে ব্যাখ্যা লিখুন"}
                            className={"h-[200px] w-full"}
                        />

                    </div>


                </div>


                <div className="flex justify-between mt-6">
                    <Button onClick={addNewQuestion}>নতুন প্রশ্ন যোগ করুন</Button>
                    <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
                        <EyeIcon /> {
                            showPreview ? "প্রিভিউ বন্ধ করুন" : "প্রিভিউ দেখুন"
                        }
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

        </div >
    );
}
