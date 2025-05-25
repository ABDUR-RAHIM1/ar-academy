"use client"
import { postActions } from '@/actions/admins/postActions';
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import { accountDelete, updateUserStatus } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function UserTable({ usersData }) {
    const { showToast } = useContext(contextD);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (usersData) {
            setUsers(usersData)
        }
    }, [usersData]);


    //  Status OnChange Handler 
    const handleStatusChange = async (e, userId) => {
    
        const payload = {
            method: "PUT",
            api: updateUserStatus + userId,
            body: { status: e.target.value }
        }
        const { status, data } = await postActions(payload);
        showToast(status, data)

    }


    const columns = [
        {
            name: "Index",
            selector: (row, index) => index + 1
        },
        {
            name: "Name",
            selector: row => row.username
        },
        {
            name: "Email",
            selector: row => row = row.email
        },
        {
            name: "Status",
            selector: row => <div>
                <select
                    onChange={(e) => handleStatusChange(e, row._id)}
                    name="status"
                    id="status"
                    value={row.status}
                    className={`px-1 py-1 rounded-sm border ${row.status === "pending" ? "border-red-500 text-red-800" : row.status === "accept" ? "border-green-300 text-green-600" : ""} `}
                >
                    <option value="pending">Pending</option>
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                </select>
            </div>
        },
        {
            name: "Delete",
            selector: row => <DeleteActionButton deleteRoute={accountDelete + row._id} />
        },
    ]

    return (
        <div className='my-10 p-4 bg-gray-100 rounded-lg shadow-lg'>
            <DataTable
                title={`User Managment : ${users?.length}`}
                columns={columns}
                data={users}
                pagination
                subHeader
                subHeaderAlign="left"
                customStyles={{
                    headCells: {
                        style: {
                            backgroundColor: '#4c4f69',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '400',
                        },
                    },
                    cells: {
                        style: {
                            backgroundColor: '#f4f4f9',
                            fontSize: '14px',
                            color: '#333',
                        },
                    },
                }}
            />
        </div>
    )
}
