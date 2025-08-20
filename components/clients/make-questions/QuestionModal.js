"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getAllClassList } from "@/app/apiActions/classList";
import { getSubjectByQuery } from "@/app/apiActions/subjectList";
import { getChapterByQuery } from "@/app/apiActions/chapterList";
import { getQuestionsSheetByQuery } from "@/app/apiActions/questionSheet";


export default function DatabaseQuestionModal({ setQuestionSheet }) {
    const [checkedIds, setCheckedIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chapterLoading, setChapterLoading] = useState(false);

    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [chapterList, setChapterList] = useState([]);
    const [questionsSheetList, setQuestionSheetList] = useState(null)



    const [formData, setFormData] = useState({
        classId: "",
        subjectId: "",
        chapterId: ""
    });

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const toggleCheck = (question) => {
        // checkbox-এর জন্য checkedIds update
        setCheckedIds((prev) =>
            prev.includes(question.ID)
                ? prev.filter((id) => id !== question.ID) // uncheck হলে ID remove
                : [...prev, question.ID] // check হলে ID add
        );

        // parent state-এ question add/remove
        setQuestionSheet((prev) =>
            prev.some((q) => q.ID === question.ID)
                ? prev.filter((q) => q.ID !== question.ID) // remove question
                : [...prev, question] // add question
        );
    };



    //    fetch all Class List
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const { status, data } = await getAllClassList();
                if (status === 200) {
                    setClassList(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };
        getData();

    }, []);

    //  fetch subject by classId query 
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const { status, data } = await getSubjectByQuery(formData.classId);
                if (status === 200) {
                    setSubjectList(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        };

        getData();

    }, [formData.classId]);




    //  fetch chapter by subjectId query
    //  get chapters by queries
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const { status, data } = await getChapterByQuery(formData.subjectId);
                if (status === 200) {
                    setChapterList(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        getData();

    }, [formData.subjectId])



    // fetch single questions by chapter id
    useEffect(() => {
        const getData = async () => {
            try {
                setChapterLoading(true)
                const { status, data } = await getQuestionsSheetByQuery(formData.chapterId);
                if (status === 200) {
                    setQuestionSheetList(data);
                } else {
                    setQuestionSheetList(null)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setChapterLoading(false)
            }
        };

        if (formData?.chapterId) {
            getData();
        }
    }, [formData.chapterId]);



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>ডাটাবেজ থেকে যোগ করুন</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] min-h-[90vh] max-h-[90vh] overflow-y-auto flex flex-col">
                <DialogHeader>
                    <DialogTitle> প্রশ্ন বাছাই করুন </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>

                {/* Top Fixed Filter Section */}
                <div className="grid grid-cols-3 gap-4 mb-4 shrink-0">
                    {/* Class */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">শ্রেণি</label>
                        <Select
                            onValueChange={(value) => handleChange("classId", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="ক্লাস বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                {classList.map((cls, index) => (
                                    <SelectItem key={cls._id || index} value={cls._id}>
                                        {cls.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">বিষয়</label>
                        <Select
                            disabled={loading}
                            onValueChange={(value) => handleChange("subjectId", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={loading ? "লোড হচ্ছে..." : "বিষয় বাছাই করুন"} />
                            </SelectTrigger>
                            <SelectContent>
                                {subjectList.map((subj, index) => (
                                    <SelectItem key={subj._id || index} value={subj._id}>
                                        {subj.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Chapter */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">অধ্যায়</label>
                        <Select
                            disabled={loading}
                            onValueChange={(value) => handleChange("chapterId", value)}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={loading ? "লোড হচ্ছে..." : "অধ্যায় বাছাই করুন"}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {chapterList.map((chap, index) => (
                                    <SelectItem key={chap._id || index} value={chap._id}>
                                        {`${chap.name} - ${chap.title}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>



                {/* Scrollable Question List */}
                <div className="flex-1 overflow-y-auto space-y-2 border-t pt-3">

                    {questionsSheetList !== null &&
                        <div className=" my-3 border rounded-md p-3 text-center space-y-1">
                            <h2 className=" font-medium text-2xl">শ্রেণি: {questionsSheetList.classId?.name}</h2>
                            <h2 className=" font-medium text-xl">বিষয়: {questionsSheetList.subjectId?.name}</h2>
                            <h2 className=" font-medium text-xl">অধ্যায়: {questionsSheetList.chapterId?.name}</h2>
                            <h4>{questionsSheetList.chapterId?.title}</h4>
                        </div>}

                    {questionsSheetList !== null ? (
                        questionsSheetList?.questions?.map((q, index) => (
                            <div
                                key={index}
                                className="border p-3 rounded-md mb-3"
                            >
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={checkedIds.includes(q.ID)} // শুধুমাত্র ID চেক করা
                                        onChange={() => toggleCheck(q)}
                                        className="mr-2"
                                    />
                                    {
                                        index + 1 + ") "
                                    }
                                    <span className="font-medium mx-2">{q.Question}</span>
                                </div>

                                {/* Options গুলো */}
                                <div className="ml-6 space-y-1 grid grid-cols-2">
                                    <p>1. {q.Option1}</p>
                                    <p>2. {q.Option2}</p>
                                    <p>3. {q.Option3}</p>
                                    <p>4. {q.Option4}</p>
                                </div>
                            </div>
                        ))
                    ) : (

                        chapterLoading ?
                            "লোড হচ্ছে........."
                            : <p>কোন প্রশ্ন নেই! </p>

                    )}

                </div>

                <DialogFooter className="mt-4 shrink-0">
                    <Button
                        onClick={() => {
                            alert(
                                `Selected question IDs:\n${checkedIds.length > 0 ? checkedIds.join(", ") : "None"
                                }`
                            );
                        }}
                    >
                        বন্ধকরুন
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
