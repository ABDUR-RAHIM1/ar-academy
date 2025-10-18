'use client';

import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import QuestionCard from './QuestionCard';

export default function QuestionClient({ questions }) {
    const [filterType, setFilterType] = useState('all'); // 'free', 'paid', 'all'

    // Filter logiccins
    const filteredQuestions = questions.filter(q =>
        filterType === 'all' ? true : q.type === filterType
    );

    return (
        <div>
            {/* 🔍 Search + Filter */}
            <div className="mb-6 flex items-center justify-between gap-4 bg-white px-2 py-4">

                <h3 className=' texl-lg font-semibold color2 border-b-2'>সব প্রশ্নের তালিকা</h3>
                <div>
                    {/* Filter Dropdown */}

                    <Select
                        value={filterType}
                        onValueChange={(value) => setFilterType(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>ধরন</SelectLabel>
                                <SelectItem value="all">সব</SelectItem>
                                <SelectItem value="free">ফ্রি</SelectItem>
                                <SelectItem value="paid">পেইড</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* Filtered Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((exam, index) => (
                        <QuestionCard key={index} exam={exam} index={index} />
                    ))
                ) : (
                    <p className="text-red-500">কোন প্রশ্ন মেলেনি</p>
                )}
            </div>
        </div>
    );
}