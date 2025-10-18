"use client"
import { postActions } from '@/actions/admins/postActions';
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import { accountDelete, studentDeleteOnlySubAdmin, updateStudentStatusBySubAdmin, updateUserStatus } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { ActionDropdown } from '@/app/(admin)/dashboard/users/view/ActionDropdown';
import DeleteActionButtonSubAdmin from '@/actions/Buttons/DeleteActionButtonSubAdmin';
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';

export default function StudentTable({ studentData }) {
    const { showToast } = useContext(contextD);
    const [students, setStudents] = useState([]);


    useEffect(() => {
        if (studentData) {
            setStudents(studentData)
        }
    }, [studentData]);


    //  Status OnChange Handler 
    const handleStatusChange = async (e, studentId) => {

        const payload = {
            method: "PUT",
            api: updateStudentStatusBySubAdmin + studentId,
            body: { status: e.target.value }
        }
        const { status, data } = await postActionsSubAdmin(payload);
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
            name: "Status",
            selector: row => <div>
                <select
                    onChange={(e) => handleStatusChange(e, row._id)}
                    name="status"
                    id="status"
                    value={row.status}
                    className={`px-1 py-1 rounded-sm border ${row.status === "pending" ? "border-yellow-500 text-yellow-800" : row.status === "active" ? "border-green-300 text-green-600" : "text-red-500 border-red-500"} `}
                >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="reject">Reject</option>
                </select>
            </div>
        },
        {
            name: "Delete",
            selector: row => <DeleteActionButtonSubAdmin deleteRoute={studentDeleteOnlySubAdmin + row._id} />
        }


    ]

    return (
        <div className='my-10 p-2 md:p-4 bg-gray-100 rounded-lg shadow-lg'>
            <DataTable
                title={`Student Managment : ${students?.length}`}
                columns={columns}
                data={students}
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
