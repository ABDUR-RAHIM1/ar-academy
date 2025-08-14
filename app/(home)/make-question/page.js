"use client";
import React, { useEffect, useState } from "react";
import Preview from "./Preview";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { chaptersList, classes, questionsList, subjects } from "@/LocalDatabase/dummyQuestion";
import QuestionModal from "./QuestionModal";

export default function MakeQuestion() {
    const [form, setForm] = useState({
        institute: "",
        examName: "",
        subjectName: "",
        column: 2,
        fullMarks: "",
        time: "",
        type: "",
        fontSize: "13px",
    });

    const [questions, setQuestions] = useState([]);

    const [newQuestion, setNewQuestion] = useState({
        position: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
    });

    const questionTypeOfbulletPoint = {
        bangla: ["ক", "খ", "গ", "ঘ"],
        english: ["A", "B", "C", "D"],
        math: ["1", "2", "3", "4"],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion({ ...newQuestion, [name]: value });
    };

    const handleAddQuestion = () => {
        const autoPosition = questions.length + 1;
        setQuestions([
            ...questions,
            {
                ...newQuestion,
                position: newQuestion.position || autoPosition,
            },
        ]);
        // setNewQuestion({
        //   position: "",
        //   question: "",
        //   option1: "",
        //   option2: "",
        //   option3: "",
        //   option4: "",
        // });
    };

    const bulletPoint = questionTypeOfbulletPoint[form.type || []];

    //  classess, subject ,chapters , questioons
    const [classId, setClassId] = useState("");
    const [subjectList, setSubjectList] = useState([]);

    const [subjecId, setSubjectId] = useState("")
    const [chapterList, setChapterList] = useState([]);

    const [chapterId, setChapterId] = useState("")
    const [questionList, setQuestionList] = useState([])

    const handleClassListChange = (e) => {
        setClassId(e.target.value)
    }

    //  set subject in state
    useEffect(() => {
        const filterdSubject = subjects.filter((sub) => sub.classId === classId);
        setSubjectList(filterdSubject)
    }, [classId])


    const handleSubjectChange = (e) => {
        setSubjectId(e.target.value)
    }


    //  ste chapter in state 
    useEffect(() => {
        const filteredChapter = chaptersList.filter((cl, i) => cl.subjectId === subjecId);
        setChapterList(filteredChapter)
    }, [subjecId])

    //  set question in the state
    useEffect(() => {
        const filterdQUestions = questionsList.filter((ql, i) => ql.chapterId === chapterId);
        setQuestionList(filterdQUestions)
    }, [chapterId])



    const selectStyle = 'border border-1 rounded-md'

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-10">
            <h1 className="text-2xl font-bold text-center">প্রশ্নপত্র তৈরি ফর্ম</h1>

            {/* তথ্য ফরম */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md border">
                <div className="space-y-1">
                    <Label htmlFor="institute">শিক্ষা প্রতিষ্ঠানের নাম</Label>
                    <Input
                        id="institute"
                        name="institute"
                        value={form.institute}
                        onChange={handleChange}
                        placeholder="উদাহরণ: ঢাকা কলেজ"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="examName">পরীক্ষার নাম</Label>
                    <Input
                        id="examName"
                        name="examName"
                        value={form.examName}
                        onChange={handleChange}
                        placeholder="উদাহরণ: বার্ষিক পরীক্ষা"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="subjectName">বিষয়ের নাম</Label>
                    <Input
                        id="subjectName"
                        name="subjectName"
                        value={form.subjectName}
                        onChange={handleChange}
                        placeholder="উদাহরণ: গণিত"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="fullMarks">পূর্ণ নম্বর</Label>
                    <Input
                        id="fullMarks"
                        type="number"
                        name="fullMarks"
                        value={form.fullMarks}
                        onChange={handleChange}
                        placeholder="উদাহরণ: ১০০"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="time">সময়</Label>
                    <Input
                        id="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        placeholder="উদাহরণ: ৩ ঘণ্টা"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="type">বুলেট পয়েন্ট নির্বাচন করুন</Label>
                    <Select
                        value={form.type}
                        onValueChange={(value) => setForm({ ...form, type: value })}
                    >
                        <SelectTrigger id="type">
                            <SelectValue placeholder="বুলেট পয়েন্ট নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bangla">বাংলা (ক, খ, গ...)</SelectItem>
                            <SelectItem value="english">ইংরেজি (A, B, C...)</SelectItem>
                            <SelectItem value="math">গণিত (1, 2, 3...)</SelectItem>
                            <SelectItem value="arabic">আরবি</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="fontSize">লিখার ফন্ট সাইজ</Label>
                    <Select
                        value={form.fontSize}
                        onValueChange={(value) => setForm({ ...form, fontSize: value })}
                    >
                        <SelectTrigger id="fontSize">
                            <SelectValue placeholder="ফন্ট সাইজ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 13 }, (_, i) => {
                                const size = `${8 + i}px`;
                                return (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className=" space-y-1">
                    <Input />
                </div>


                <div className="space-y-1">
                    <Label htmlFor="classList">Class list</Label>
                    <select value={classId} name="subjectList" onChange={handleClassListChange} className={` w-full p-3 ${selectStyle}`}>
                        {
                            classes.map((cl, i) => (
                                <option key={i} value={cl._id}>{cl.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="classList">Subject lists</Label>
                    <select value={subjecId} name="subjectList" onChange={handleSubjectChange} className={` w-full p-3 ${selectStyle}`}>
                        {
                            subjectList.map((sl, i2) => (
                                <option key={i2} value={sl._id}>{sl.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="chapterList">Chapter lists</Label>
                    <select value={chapterId} name="chapterList" onChange={(e) => setChapterId(e.target.value)} className={` w-full p-3 ${selectStyle}`}>
                        {
                            chapterList.map((cl, i2) => (
                                <option key={i2} value={cl._id}>{cl.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="space-y-4">
                    <QuestionModal questions={questionList} />
                </div>



            </div>

            {/* প্রশ্ন যোগ করুন */}
            <div className="bg-white border p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-lg font-semibold mb-2">প্রশ্ন যুক্ত করুন</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: "ক্রমিক নং", name: "position", type: "number" },
                        { label: "প্রশ্ন", name: "question", type: "text" },
                        { label: "উত্তর ১", name: "option1", type: "text" },
                        { label: "উত্তর ২", name: "option2", type: "text" },
                        { label: "উত্তর ৩", name: "option3", type: "text" },
                        { label: "উত্তর ৪", name: "option4", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="space-y-1">
                            <Label htmlFor={name}>{label}</Label>
                            <Input
                                id={name}
                                name={name}
                                type={type}
                                value={newQuestion[name]}
                                onChange={handleQuestionChange}
                                placeholder={label}
                            />
                        </div>
                    ))}
                </div>
                <Button
                    onClick={handleAddQuestion}
                    className=" bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    প্রশ্ন যুক্ত করুন
                </Button>
            </div>

            {/* প্রিভিউ */}
            <Preview form={form} questions={questions} bulletPoint={bulletPoint} />
        </div>
    );
}
