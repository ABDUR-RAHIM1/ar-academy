"use client"
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
            selector: (row) => row.name
        },
        {
            name: "Cover",
            selector: (row) => <Image
                src={row.coverPhoto}
                alt={row.name}
                width={500}
                height={600}
                className='w-[100px] h-[100px] rounded-md my-3'
            />
        },
    ]


    return (
        <div>
            <DataTable
                title={"Sibject Lists"}
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    )
}
