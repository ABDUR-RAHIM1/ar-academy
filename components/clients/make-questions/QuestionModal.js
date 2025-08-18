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

export default function DatabaseQuestionModal({ questions = [] }) {
    const [checkedIds, setCheckedIds] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    // Sample options (replace with props or fetch from backend)
    const classes = ["Class 1", "Class 2", "Class 3"];
    const subjects = ["Bangla", "English", "Math"];
    const chapters = ["Chapter 1", "Chapter 2", "Chapter 3"];

    // useEffect(() => {
    //     // Filter questions based on selected values
    //     let result = questions;

    //     if (selectedClass)
    //         result = result.filter((q) => q.class === selectedClass);
    //     if (selectedSubject)
    //         result = result.filter((q) => q.subject === selectedSubject);
    //     if (selectedChapter)
    //         result = result.filter((q) => q.chapter === selectedChapter);

    //     setFilteredQuestions(result);
    // }, [selectedClass, selectedSubject, selectedChapter, questions]);

    // const toggleCheck = (id) => {
    //     setCheckedIds((prev) =>
    //         prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    //     );
    // };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>ডাটাবেজ থেকে যোগ করুন</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] min-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Filtered Questions</DialogTitle>
                    <DialogDescription>
                        Select questions by checking the boxes.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 max-h-screen overflow-y-auto mt-4">
                    {/* Filter Selects */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {/* Class */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Class</label>
                            <Select
                                onValueChange={(value) => setSelectedClass(value)}
                                value={selectedClass}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classes.map((cls) => (
                                        <SelectItem key={cls} value={cls}>
                                            {cls}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Subject</label>
                            <Select
                                onValueChange={(value) => setSelectedSubject(value)}
                                value={selectedSubject}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subjects.map((subj) => (
                                        <SelectItem key={subj} value={subj}>
                                            {subj}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Chapter */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Chapter</label>
                            <Select
                                onValueChange={(value) => setSelectedChapter(value)}
                                value={selectedChapter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Chapter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {chapters.map((chap) => (
                                        <SelectItem key={chap} value={chap}>
                                            {chap}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Questions Preview */}
                    <div className="space-y-2">
                        {filteredQuestions.length > 0 ? (
                            filteredQuestions.map((q) => (
                                <div
                                    key={q.id}
                                    className="flex items-center border p-2 rounded-md"
                                >
                                    <input
                                        type="checkbox"
                                        checked={checkedIds.includes(q.id)}
                                        onChange={() => toggleCheck(q.id)}
                                        className="mr-2"
                                    />
                                    <span>{q.text}</span>
                                </div>
                            ))
                        ) : (
                            <p>No questions found for selected filters.</p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={() => {
                            alert(
                                `Selected question IDs:\n${checkedIds.length > 0 ? checkedIds.join(", ") : "None"
                                }`
                            );
                        }}
                    >
                        যুক্ত করুন
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
