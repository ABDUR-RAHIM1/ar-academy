"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Database, Search, Check } from "lucide-react";


// আপনার API Actions (পাথগুলো প্রোজেক্ট অনুযায়ী চেক করে নিন)
import { getAllClassList } from "@/app/apiActions/classList";
import { getSubjectByQuery } from "@/app/apiActions/subjectList";
import { getChapterByQuery } from "@/app/apiActions/chapterList";
import { getQuestionsSheetByQuery } from "@/app/apiActions/questionSheet";

export default function QuestionBankModal({ onImport, alreadyAddedTexts = [] }) {
    const [loading, setLoading] = useState(false);
    const [qLoading, setQLoading] = useState(false);
    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [chapterList, setChapterList] = useState([]);
    const [questionsSheetList, setQuestionSheetList] = useState(null);

    const [selectedIds, setSelectedIds] = useState([]); // কোন প্রশ্নগুলো সিলেক্ট করা হয়েছে
    const [selectedQuestions, setSelectedQuestions] = useState([]); // অবজেক্টগুলো রাখার জন্য

    const [formData, setFormData] = useState({
        classId: "",
        subjectId: "",
        chapterId: ""
    });

    // ১. ক্লাস লিস্ট লোড করা
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const { status, data } = await getAllClassList();
                if (status === 200) setClassList(data);
            } catch (err) { console.error(err); }
        };
        fetchClasses();
    }, []);

    // ২. সাবজেক্ট লোড করা (ClassId চেঞ্জ হলে)
    useEffect(() => {
        if (!formData.classId) return;
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const { status, data } = await getSubjectByQuery(formData.classId);
                if (status === 200) setSubjectList(data);
            } finally { setLoading(false); }
        };
        fetchSubjects();
    }, [formData.classId]);

    // ৩. চ্যাপ্টার লোড করা (SubjectId চেঞ্জ হলে)
    useEffect(() => {
        if (!formData.subjectId) return;
        const fetchChapters = async () => {
            setLoading(true);
            try {
                const { status, data } = await getChapterByQuery(formData.subjectId);
                if (status === 200) setChapterList(data);
            } finally { setLoading(false); }
        };
        fetchChapters();
    }, [formData.subjectId]);

    // ৪. প্রশ্ন লোড করা (ChapterId চেঞ্জ হলে)
    useEffect(() => {
        if (!formData.chapterId) return;
        const fetchQuestions = async () => {
            setQLoading(true);
            try {
                const { status, data } = await getQuestionsSheetByQuery(formData.chapterId);
                if (status === 200) setQuestionSheetList(data);
                else setQuestionSheetList(null);
            } finally { setQLoading(false); }
        };
        fetchQuestions();
    }, [formData.chapterId]);

    // ৫. প্রশ্ন সিলেক্ট/ডিসিলেক্ট লজিক
    const toggleSelect = (q) => {
        if (selectedIds.includes(q.ID)) {
            setSelectedIds(selectedIds.filter(id => id !== q.ID));
            setSelectedQuestions(selectedQuestions.filter(item => item.ID !== q.ID));
        } else {
            setSelectedIds([...selectedIds, q.ID]);
            setSelectedQuestions([...selectedQuestions, q]);
        }
    };

    // ৬. মেইন পেজে ডাটা পাঠানো
    const handleFinalImport = () => {
        onImport(selectedQuestions); // মেইন পেজের ফাংশনে ডাটা পাঠিয়ে দিবে
        setSelectedIds([]);
        setSelectedQuestions([]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100">
                    <Database className="mr-2 h-4 w-4" /> ডাটাবেজ থেকে প্রশ্ন নিন
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Database className="text-indigo-600" /> প্রশ্ন ব্যাংক ফিল্টার
                    </DialogTitle>
                </DialogHeader>

                {/* ফিল্টার সেকশন */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 border-y">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">শ্রেণি</label>
                        <Select onValueChange={(v) => setFormData({ ...formData, classId: v, subjectId: "", chapterId: "" })}>
                            <SelectTrigger><SelectValue placeholder="সিলেক্ট শ্রেণি" /></SelectTrigger>
                            <SelectContent>
                                {classList.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">বিষয়</label>
                        <Select disabled={!formData.classId || loading} onValueChange={(v) => setFormData({ ...formData, subjectId: v, chapterId: "" })}>
                            <SelectTrigger><SelectValue placeholder={loading ? "লোড হচ্ছে..." : "সিলেক্ট বিষয়"} /></SelectTrigger>
                            <SelectContent>
                                {subjectList.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">অধ্যায়</label>
                        <Select disabled={!formData.subjectId || loading} onValueChange={(v) => setFormData({ ...formData, chapterId: v })}>
                            <SelectTrigger><SelectValue placeholder={loading ? "লোড হচ্ছে..." : "সিলেক্ট অধ্যায়"} /></SelectTrigger>
                            <SelectContent>
                                {chapterList.map(ch => <SelectItem key={ch._id} value={ch._id}>{ch.name} - {ch.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                 

                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {qLoading ? (
                        <Loader2 className="animate-spin mx-auto mt-10" />
                    ) :

                        questionsSheetList?.questions ?
                            questionsSheetList?.questions?.map((q, index) => {

                                // চেক করছি এই প্রশ্নটি কি অলরেডি মেইন বিল্ডারে আছে?
                                const isAlreadyAdded = alreadyAddedTexts.includes(q.Question);
                                const isSelected = selectedIds.includes(q.ID);

                                return (
                                    <div
                                        key={`modal-q-${q.ID + index}`}
                                        onClick={() => {
                                            if (isAlreadyAdded) return; // অলরেডি থাকলে ক্লিক কাজ করবে না
                                            toggleSelect(q);
                                        }}
                                        className={`p-4 border rounded-xl transition-all flex gap-4 ${isAlreadyAdded
                                            ? "bg-slate-50 opacity-60 cursor-not-allowed border-dashed" // আগে যোগ করা থাকলে স্টাইল
                                            : isSelected
                                                ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 cursor-pointer"
                                                : "hover:border-slate-300 bg-white cursor-pointer"
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1 ${isAlreadyAdded
                                            ? "bg-green-100 border-green-200 text-green-600" // অলরেডি থাকলে সবুজ টিক
                                            : isSelected
                                                ? "bg-indigo-600 border-indigo-600 text-white"
                                                : "border-slate-300 bg-white"
                                            }`}>
                                            {isAlreadyAdded ? <Check size={12} strokeWidth={4} /> : isSelected && <Check size={12} strokeWidth={4} />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className={`font-semibold mb-2 ${isAlreadyAdded ? "text-slate-400" : "text-slate-800"}`}>
                                                    {q.Question}
                                                </p>
                                                {isAlreadyAdded && (
                                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                                        ADDED
                                                    </span>
                                                )}
                                            </div>
                                            <div className={`grid grid-cols-2 gap-2 text-sm ${isAlreadyAdded ? "text-slate-300" : "text-slate-600"}`}>
                                                <p>ক. {q.Option1}</p>
                                                <p>খ. {q.Option2}</p>
                                                <p>গ. {q.Option3}</p>
                                                <p>ঘ. {q.Option4}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            :
                            <div>
                                <div className="text-center py-20 text-slate-400">
                                    <Search className="mx-auto h-10 w-10 mb-2 opacity-20" />
                                    <p>কোনো প্রশ্ন পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।</p>
                                </div>
                            </div>
                    }
                </div>

                <DialogFooter className="p-6 border-t bg-white">
                    <p className="mr-auto text-sm font-medium text-slate-500">
                        সিলেক্ট করা হয়েছে: <span className="text-indigo-600 font-bold">{selectedIds.length}টি</span>
                    </p>
                    <DialogClose asChild>
                        <Button variant="ghost">বাতিল</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={handleFinalImport}
                            disabled={selectedIds.length === 0}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
                        >
                            প্রশ্নগুলো যোগ করুন
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}