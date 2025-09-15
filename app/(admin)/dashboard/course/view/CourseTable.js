"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import Heading from '@/components/clients/globals/Heading';
import { courseDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function CourseTable({ data }) {

    const [course, setCourses] = useState([]);

    useEffect(() => {
        if (data) {
            setCourses(data)
        }
    }, [course]);

    const columns = [
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "Title",
            selector: row => row.title,
            wrap: true
        },
        {
            name: "Short Desc",
            selector: row => <ul className='ml-3 space-y-2 list-disc my-4'>
                {
                    row.shortDesc && row.shortDesc.split(",")
                        .map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                }
            </ul>,
            wrap: true
        },
        {
            name: "Links",
            selector: row => <ul className='ml-3 space-y-2 list-disc my-4'>
                {
                    row.links && row.links
                        .map((item, index) => (
                            <li key={index}>
                                <a target='_blank' href={item.path}>{item.itemName || "N/A"}</a>
                            </li>
                        ))
                }
            </ul>,
            wrap: true
        },
        {
            name: "Price (R)",
            selector: row => row.regularPrice,
        },
        {
            name: "Price (O)",
            selector: row => row.offerPrice,
        },
        {
            name: "Edit",
            selector: row => <EditActionButton data={row} path={"/dashboard/course/add"} />,
        },
        {
            name: "Delete",
            selector: row => <DeleteActionButton deleteRoute={courseDelete + row._id} />,
        },
    ]

    return (
        <div className=' bg-white rounded-md p-2'>
            <Heading text={"কোর্স তালিকা"} />
            <DataTable
                columns={columns}
                data={course}
                responsive
                pagination
                highlightOnHover
            />
        </div>
    )
}
