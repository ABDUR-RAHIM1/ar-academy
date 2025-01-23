"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { subjectPutDelete } from '@/constans';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function SubjectTable({ subjectData }) {
    const [data, setData] = useState([]);


    useEffect(() => {
        if (data) {
            setData(subjectData)
        }
    }, [subjectData]);


    const columns = [
        {
            name: "#",
            selector: (row, index) => <span>{index + 1}</span >
        },
        {
            name: "Subject",
            selector: (row) => row.subjectName
        },
        {
            name: "username",
            selector: (row) => row.username
        },
        {
            name: "Cover",
            selector: (row) => <Image
                src={row.coverPhoto}
                alt={row.username}
                width={500}
                height={600}
                className='w-[100px] h-[100px] rounded-md my-3'
            />
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/subjects/edit"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteActionButton deleteRoute={subjectPutDelete + row._id} />
        },
    ]


    return (
        <div>
            <DataTable
                title={"Subject Lists"}
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    )
}
