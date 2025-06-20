"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const customStyles = {
    headCells: {
        style: {
            backgroundColor: "#f3f4f6",
            fontWeight: "bold",
            fontSize: "14px",
        },
    },
    rows: {
        style: {
            fontSize: "14px",
        },
    },
};

const columns = [
    {
        name: "#",
        selector: (row, index) => index + 1,
        width: "60px",
    },
    {
        name: "ইউজারনেম",
        selector: row => row.user?.username || "N/A",
        sortable: true,
    },
    {
        name: "ইমেইল",
        selector: row => row.user?.email || "N/A",
        sortable: true,
        grow: 2,
    },
    {
        name: "প্ল্যান",
        selector: row => row.planName,
        sortable: true,
    },
    {
        name: "দাম",
        selector: row => row.price === 0 ? "ফ্রি" : `৳ ${row.price}`,
        sortable: true,
    },
    {
        name: "মেয়াদ শেষ",
        selector: row => new Date(row.endDate).toLocaleDateString(),
        sortable: true,
    },
    {
        name: "অবস্থা",
        selector: row => {
            if (row.status === "active") return "✅ Active";
            if (row.status === "expired") return "⏳ Expired";
            if (row.status === "cancelled") return "❌ Cancelled";
            return "❌ Inactive";
        },
        sortable: true,
    },
];

// ✅ Expanded Component for extra plan details
const ExpandedComponent = ({ data }) => {
  const formattedDate = data.updatedAt
    ? new Date(data.updatedAt).toLocaleString('bn-BD')
    : "তথ্য নেই";

  // Status-wise updated label
  const getStatusLabel = (status) => {
    if (status === "cancelled") return "বাতিলের তারিখ:";
    if (status === "expired") return "মেয়াদ শেষের তারিখ:";
    if (status === "active") return "সক্রিয়করণের তারিখ:";
    return "আপডেটের তারিখ:";
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md text-sm space-y-2">
      <div><strong>প্ল্যান নাম:</strong> {data.planName}</div>
      <div><strong>প্ল্যান লেবেল:</strong> {data.planLabel}</div>
      <div><strong>ক্রয়ের তারিখ:</strong> {new Date(data.purchaseDate).toLocaleString('bn-BD')}</div>
      <div>
        <strong>{getStatusLabel(data.status)}</strong> {formattedDate}
      </div>
      <div>
        <strong>স্ট্যাটাস:</strong> {
          data.status === "active" ? "✅ সক্রিয়" :
          data.status === "expired" ? "⏳ মেয়াদ শেষ" :
          data.status === "cancelled" ? "❌ বাতিল" :
          "❌ অজানা"
        }
      </div>
    </div>
  );
};



export default function SalesTable({ soldsData }) {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        setSales(soldsData);
    }, [soldsData]);

    return (
        <div className="p-4 my-10">
            <DataTable
                title="বিক্রিত সাবস্ক্রিপশন প্ল্যান রিপোর্ট"
                columns={columns}
                data={sales}
                pagination
                responsive
                highlightOnHover
                striped
                customStyles={customStyles}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    );
}
