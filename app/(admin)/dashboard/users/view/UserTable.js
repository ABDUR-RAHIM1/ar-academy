"use client"
import { postActions } from '@/actions/admins/postActions';
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import { userAllAccountStatusDelete } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function UserTable({ usersData }) {
    const { showToast } = useContext(contextD);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (usersData) {
            setUsers(usersData)
        }
    }, [usersData]);


    //  Status OnChange Handler 
    const handleStatusChange = async (e, userId) => {
        setStatus(e.target.value);
        console.log(e.target.value, userId)


        const payload = {
            method: "PUT",
            api: userAllAccountStatusDelete + userId,
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
            name: "Plan",
            selector: row => row.plan?.plan
        },
        {
            name: "Price",
            selector: row => row.plan?.price
        },
        {
            name: "Payment Number",
            selector: row => row.bkashNumber
        },
        {
            name: "Amount",
            selector: row => `${"৳" + row.amount}`
        },
        {
            name: "Delete",
            selector: row => <DeleteActionButton deleteRoute={userAllAccountStatusDelete + row._id} />
        },
    ]

    return (
        <div className=' my-10'>
            <DataTable
                columns={columns}
                data={users}
                pagination

            />
        </div>
    )
}
