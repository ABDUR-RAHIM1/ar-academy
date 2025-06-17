'use client';
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import { accountDelete } from '@/constans';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function AdminTable({ adminList }) {
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        setAdmin(adminList)
    }, [adminList])

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
            cell: row => <span className="capitalize text-blue-600 font-semibold">{row.role}</span>,
        },
        {
            name: "Verified",
            selector: row =>
                row.isVerified ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Verified
                    </span>
                ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Unverified
                    </span>
                )
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            cell: row => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            name: 'Joined',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => <DeleteActionButton deleteRoute={accountDelete + row._id} />
        },
    ];

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">🧑‍💼 অ্যাডমিন টিম তালিকা</h2>
                <DataTable
                    columns={columns}
                    data={admin}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                />
            </div>
        </div>
    );
}
