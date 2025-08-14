"use client";

import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";

export default function QuestionModal({ questions = [] }) {
    // checked questions state
    const [checkedIds, setCheckedIds] = useState([]);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    প্রশ্নগুলো দেখুন 
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Filtered Questions</DialogTitle>
                    <DialogDescription>
                        Select questions by checking the boxes.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 max-h-96 overflow-y-auto mt-4">
                    {questions.length === 0 && <p>No questions found.</p>}

                    {questions.map((q, i) => (
                        <div
                            key={q._id}
                            className=" border rounded p-3"
                        >
                            <div className=" flex items-center justify-between">
                                <div>
                                    <span className="font-semibold">{i + 1}. </span>
                                    <span>{q.questionText}</span>
                                </div>
                                <div >
                                    <input type="checkbox" className=" p-2" />
                                </div>
                            </div>
                            <ul className="p-3 my-2 grid grid-cols-2 ml-2 gap-2 list-decimal">
                                {
                                    q.options.map((o, i) => (
                                        <li key={i}>{o}</li>
                                    ))
                                }
                            </ul>


                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <Button
                        onClick={() => {
                            alert(
                                `Selected question IDs:\n${checkedIds.length > 0 ? checkedIds.join(", ") : "None"}`
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
