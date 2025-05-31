"use client";
import DeleteActionButton from "@/actions/Buttons/DeleteActionButton";
import EditActionButton from "@/actions/Buttons/EditActionButton";
import { planDelete } from "@/constans";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

// কাস্টম স্টাইল (ইচ্ছা করলে বাদ দিতে পারো)
const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#f3f4f6',
            fontWeight: 'bold',
            fontSize: '14px',
        },
    },
    rows: {
        style: {
            fontSize: '14px',
        },
    },
};

// টেবিল কলাম ডিফাইন
const columns = [
    {
        name: "#",
        selector: (row, index) => index + 1,
        width: "60px",
    },
    {
        name: "প্ল্যান",
        selector: row => `${row.emoji} ${row.label}`,
        sortable: true,
        grow: 1.5,
    },
    {
        name: "বর্ণনা",
        selector: row => row.description,
        sortable: false,
        grow: 2,
    },
    {
        name: "দাম (৳)",
        selector: row => row.price === 0 ? "ফ্রি" : `৳ ${row.price}`,
        sortable: true,
    },
    {
        name: "মেয়াদ",
        selector: row => row.days === 0 ? "সীমাহীন" : `${row.days} দিন`,
        sortable: true,
    },
    {
        name: "ফিচারসমূহ",
        cell: row => (
            <ul className="list-disc list-inside space-y-1 my-4">
                {row.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                ))}
            </ul>
        ),
        grow: 3,
    },
    {
        name: "এডিট",
        selector: row => <EditActionButton />,
        sortable: true,
    },
    {
        name: "ডিলিট",
        selector: row => <DeleteActionButton btnText={"ডিলিট করুন"} deleteRoute={planDelete + row._id} />,
        sortable: true,
        grow: 1.5
    },
];

export default function PlansTable({ plansData }) {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        setPlans(plansData)
    }, [plansData])


    return (
        <div className="p-4 my-10">
            <DataTable
                title="সাবস্ক্রিপশন প্ল্যানসমূহ"
                columns={columns}
                data={plans}
                pagination
                responsive
                highlightOnHover
                striped
                customStyles={customStyles}
            />
        </div>
    );
}
