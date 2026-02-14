"use client";

import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search, RotateCw, CheckCircle,
    XCircle, Clock, ShieldCheck, Gift
} from "lucide-react";
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
import { purchasePayementUpdate } from '@/constans';
import { useRouter } from 'next/navigation';

export default function PurchasedTable({ purchasedData }) {
    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const loadData = useCallback(() => {
        setLoading(true);
        if (purchasedData) setData(purchasedData);
        setTimeout(() => setLoading(false), 500);
    }, [purchasedData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // ফিল্টারিং লজিক (ইমেইল বা ট্রানজেকশন আইডি দিয়ে সার্চ)
    const filteredData = data.filter((item) => {
        const trxId = item.paymentDetails?.transactionId || "";
        const email = item.student?.email || "";
        const matchesSearch =
            trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 uppercase text-[10px] font-bold"><CheckCircle className="w-3 h-3 mr-1" /> Active</Badge>;
            case 'pending':
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 uppercase text-[10px] font-bold"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 uppercase text-[10px] font-bold"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };


    //  handle update status
    const handleUpdateStatus = async (purchaseId, newStatus) => {
        try {
            setUpdateLoading(newStatus);

            const payload = {
                method: "PUT",
                api: purchasePayementUpdate,
                body: {
                    purchaseId, newStatus
                }
            };

            const { status, data } = await postActions(payload);
            showToast(status, data);
            router.refresh();

        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setUpdateLoading(null);
        }
    };

    return (
        <div className="space-y-6 p-6 bg-white rounded-[32px] border border-slate-200 shadow-sm">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <ShieldCheck className="text-blue-600" /> এনরোলমেন্ট ম্যানেজমেন্ট
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">সব ধরণের (Free/Paid) পারচেজ হিস্ট্রি দেখুন</p>
                </div>
                <Button onClick={loadData} variant="outline" size="sm" className="rounded-xl border-slate-200 hover:bg-slate-50 h-10">
                    <RotateCw className={`w-4 h-4 mr-2 ${loading && 'animate-spin'}`} /> রিফ্রেশ
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                        placeholder="Email বা TrxID দিয়ে সার্চ করুন..."
                        className="pl-11 h-12 rounded-2xl border-slate-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select onValueChange={setStatusFilter} defaultValue="all">
                    <SelectTrigger className="w-full md:w-[200px] h-12 rounded-2xl">
                        <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">সবগুলো</SelectItem>
                        <SelectItem value="active">অ্যাক্টিভ</SelectItem>
                        <SelectItem value="pending">পেন্ডিং</SelectItem>
                        <SelectItem value="rejected">রিজেক্টেড</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-[24px] border border-slate-100 overflow-hidden bg-slate-50/20">
                <Table>
                    <TableHeader className="bg-slate-100/50">
                        <TableRow>
                            <TableHead className="font-bold py-4">Student Info</TableHead>
                            <TableHead className="font-bold">Payment Method</TableHead>
                            <TableHead className="font-bold">Amount</TableHead>
                            <TableHead className="font-bold">Date</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="text-right font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? filteredData.map((item) => (
                            <TableRow key={item._id} className="bg-white hover:bg-slate-50/50 border-b border-slate-100">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-black text-slate-800">{item.student?.username || "N/A"}</span>
                                        <span className="text-[11px] text-slate-500 font-medium">{item.student?.email || item.student?.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {item.paymentDetails?.paymentMethod === 'free' ? (
                                        <div className="flex items-center gap-1.5 text-pink-600 font-bold text-xs uppercase bg-pink-50 px-2 py-1 rounded-lg w-fit">
                                            <Gift size={14} /> Free Enrollment
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-1">
                                            <Badge variant="secondary" className="w-fit text-[10px] font-black">{item.paymentDetails?.paymentMethod}</Badge>
                                            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-tighter">
                                                {item.paymentDetails?.transactionId}
                                            </span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-black text-slate-800 text-sm">৳{item.paidAmount}</span>
                                        {item.courseOfferPrice > 0 && (
                                            <span className="text-[10px] text-slate-400 line-through">৳{item.courseOfferPrice}</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs text-slate-600 font-medium">
                                        {new Date(item.purchaseDate).toLocaleDateString('bn-BD')}
                                    </span>
                                </TableCell>
                                <TableCell>{getStatusBadge(item.status)}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="rounded-xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all px-4"
                                                onClick={() => setSelectedItem(item)}
                                            >
                                                Details
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="rounded-[28px] sm:max-w-[450px] border-none shadow-2xl">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-black text-slate-800">পারচেজ ডিটেইলস</DialogTitle>
                                                <DialogDescription className="font-medium text-slate-500">
                                                    নিচের তথ্যগুলো যাচাই করে পেমেন্ট অ্যাপ্রুভ বা রিজেক্ট করুন।
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-4 py-4">
                                                {/* স্টুডেন্ট এবং কোর্স ইনফো */}
                                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-[11px] font-bold text-slate-400 uppercase">Student Contact</span>
                                                        <span className="text-xs font-bold text-slate-700">{selectedItem?.student?.email || selectedItem?.student?.phone}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[11px] font-bold text-slate-400 uppercase">Course ID</span>
                                                        <span className="text-xs font-mono font-medium text-slate-600">{selectedItem?.course}</span>
                                                    </div>
                                                </div>

                                                {/* পেমেন্ট এবং ট্রানজেকশন গ্রিড */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                                                        <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Method</p>
                                                        <p className="font-black text-blue-700 uppercase text-sm">
                                                            {selectedItem?.paymentDetails?.paymentMethod}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                                                        <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">TrxID</p>
                                                        <p className="font-mono font-bold text-indigo-700 text-sm truncate">
                                                            {selectedItem?.paymentDetails?.transactionId || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* প্রাইসিং ডিটেইলস */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Offer Price</p>
                                                        <p className="font-black text-slate-700 text-lg">৳{selectedItem?.courseOfferPrice}</p>
                                                    </div>
                                                    <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
                                                        <p className="text-[10px] text-green-500 font-bold uppercase mb-1">User Paid</p>
                                                        <p className="font-black text-green-700 text-lg">৳{selectedItem?.paidAmount}</p>
                                                    </div>
                                                </div>

                                                {/* যদি পেমেন্টে কোনো ঝামেলা থাকে (যেমন কম টাকা দিলে) */}
                                                {selectedItem?.paidAmount < selectedItem?.courseOfferPrice && selectedItem?.paymentDetails?.paymentMethod !== 'free' && (
                                                    <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                        <p className="text-[11px] font-bold text-red-600">ইউজার অফার প্রাইসের চেয়ে কম টাকা পেমেন্ট করেছে!</p>
                                                    </div>
                                                )}
                                            </div>

                                            <DialogFooter className="flex flex-row gap-3 mt-2">
                                                {/* Reject Button */}
                                                {selectedItem?.status !== "rejected" && (
                                                    <Button
                                                        disabled={updateLoading !== null} // যে কোনো একটা লোড হলে বাকিগুলো ডিজেবল
                                                        className="flex-1 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none h-12 font-bold transition-all"
                                                        variant="outline"
                                                        onClick={() => handleUpdateStatus(selectedItem._id, 'rejected')}
                                                    >
                                                        {updateLoading === "rejected" ? "Rejecting..." : "Reject"}
                                                    </Button>
                                                )}

                                                {/* Approve Button */}
                                                {selectedItem?.status !== "active" && (
                                                    <Button
                                                        disabled={updateLoading !== null}
                                                        className="flex-1 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 h-12 font-bold shadow-lg transition-all"
                                                        onClick={() => handleUpdateStatus(selectedItem._id, 'active')}
                                                    >
                                                        {updateLoading === "active" ? "Approving..." : "Approve Payment"}
                                                    </Button>
                                                )}

                                                {/* Pending Button */}
                                                {selectedItem?.status !== "pending" && (
                                                    <Button
                                                        disabled={updateLoading !== null}
                                                        className="flex-1 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 h-12 font-bold shadow-lg transition-all"
                                                        onClick={() => handleUpdateStatus(selectedItem._id, 'pending')}
                                                    >
                                                        {updateLoading === "pending" ? "Setting Pending..." : "Make Pending"}
                                                    </Button>
                                                )}
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-40 text-center text-slate-400 font-bold">
                                    কোনো ডাটা পাওয়া যায়নি
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}