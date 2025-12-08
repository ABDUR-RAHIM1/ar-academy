"use client";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LeaderBoardDetails({ leaderboardData }) {
    const [openHistory, setOpenHistory] = useState(null);

    const toggleHistory = (userId) => {
        setOpenHistory(openHistory === userId ? null : userId);
    };

    return (
        <div className="p-5 my-10 bg-white rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold mb-6 text-center border-b">
                লিডারবোর্ড
            </h1>

            {leaderboardData && leaderboardData.length > 0 ?
                <div className="border rounded-xl overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-indigo-50">
                                <TableHead>Rank</TableHead>
                                <TableHead> User Info</TableHead>
                                <TableHead className="text-center">Marks</TableHead>
                                <TableHead className="text-center">Cut Mark</TableHead>
                                <TableHead className="text-center">Attempted</TableHead>
                                <TableHead className="text-center">Correct</TableHead>
                                <TableHead className="text-center">Wrong</TableHead>
                                <TableHead className="text-center">Skip</TableHead>
                                <TableHead className="text-center">Pass</TableHead>
                                <TableHead className="text-center">Fail</TableHead>
                                <TableHead className="text-center">Questions</TableHead>
                                <TableHead className="text-center">History</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {leaderboardData.map((u, index) => (
                                <React.Fragment key={u.user._id}>
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className={"space-y-2"}>
                                            <p>{u.user.username}</p>
                                            <p className="text-[12px]">{u.user.email}</p>
                                        </TableCell>

                                        <TableCell className="text-center font-bold">
                                            {u.totalMarks}
                                        </TableCell>

                                        <TableCell className="text-center font-bold">
                                            {u.totalCutMark || 0}
                                        </TableCell>

                                        <TableCell className="text-center">{u.totalAttempted}</TableCell>
                                        <TableCell className="text-center">{u.totalCorrect}</TableCell>
                                        <TableCell className="text-center">{u.totalWrong}</TableCell>
                                        <TableCell className="text-center">{u.totalSkip}</TableCell>
                                        <TableCell className="text-center">{u.totalIsPass}</TableCell>
                                        <TableCell className="text-center">{u.totalIsFail}</TableCell>
                                        <TableCell className="text-center">{u.totalQuestions}</TableCell>

                                        <TableCell className="text-center">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => toggleHistory(u.user._id)}
                                            >
                                                {openHistory === u.user._id ? "Hide" : "View"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* HISTORY COLLAPSE */}
                                    {openHistory === u.user._id && (
                                        <TableRow className="bg-gray-50">
                                            <TableCell colSpan={13}>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-lg mb-3">
                                                        {u.user.username}'s History
                                                    </h3>

                                                    <div className="overflow-x-auto border rounded-lg">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow className="bg-gray-200">
                                                                    <TableHead>Question</TableHead>
                                                                    <TableHead className="text-center">Marks</TableHead>
                                                                    <TableHead className="text-center">Correct</TableHead>
                                                                    <TableHead className="text-center">Wrong</TableHead>
                                                                    <TableHead className="text-center">Attempted</TableHead>
                                                                    <TableHead className="text-center">Skip</TableHead>
                                                                    <TableHead className="text-center">Cut Mark</TableHead>
                                                                    <TableHead className="text-center">Pass Mark</TableHead>
                                                                    <TableHead className="text-center">Pass</TableHead>
                                                                    <TableHead className="text-center">Total Q</TableHead>
                                                                    <TableHead className="text-center">Date</TableHead>
                                                                </TableRow>
                                                            </TableHeader>

                                                            <TableBody>
                                                                {u.history.map((h, i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell>
                                                                            <Link
                                                                                href={`/dashboard/course/${h.questionId}`}
                                                                                className="text-blue-600 hover:underline"
                                                                            >
                                                                                {h.questionName}
                                                                            </Link>
                                                                        </TableCell>

                                                                        <TableCell className="text-center">{h.totalmark}</TableCell>
                                                                        <TableCell className="text-center">{h.correctAns}</TableCell>
                                                                        <TableCell className="text-center">{h.wrongAns}</TableCell>
                                                                        <TableCell className="text-center">{h.attempted}</TableCell>
                                                                        <TableCell className="text-center">{h.skip}</TableCell>
                                                                        <TableCell className="text-center">{h.cutMark}</TableCell>
                                                                        <TableCell className="text-center">{h.passMark || "N/A"}</TableCell>
                                                                        <TableCell className="text-center">{h.isPass ? "Yes" : "No"}</TableCell>
                                                                        <TableCell className="text-center">{h.totalQuestions}</TableCell>
                                                                        <TableCell className="text-center">
                                                                            {new Date(h.createdAt).toLocaleDateString()}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                :
                <div className="p-5">
                    <p className=" text-red-500 font-medium text-lg text-center"> কোন প্রতিযোগী নেই!</p>
                </div>
            }
        </div>
    );
}
