"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import Heading from '@/components/clients/globals/Heading';
import { Button } from '@/components/ui/button';
import { courseDelete } from '@/constans';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
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
            selector: row => <div title={row.name}>
                {row.name}
            </div>
        },
        {
            name: "Title",
            selector: row => row.title,
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
            name: "Leaderboard",
            selector: row => <Button className={"bg-blue-500 text-white hover:bg-blue-400"}>
                <Link href={`/dashboard/course/leaderboard/${row._id}`}>
                    <Trophy />
                </Link>
            </Button>
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

    const ExpandedRows = ({ data }) => {
        return (
            <div className=' flex items-start gap-5'>
                <ul className=' w-full md:w-[30%]  ml-3 space-y-2 list-disc my-4'>
                    <h3 className='my-2 font-bold'> Short Description:</h3>
                    {
                        data.shortDesc && data.shortDesc.split(",")
                            .map((item, index) => (
                                <li key={index}>{item}</li>
                            ))
                    }
                </ul>
                <ul className=' w-full md:w-[68%] ml-3 space-y-2 list-disc my-4'>
                    <h3 className='my-2 font-bold'>  Description:</h3>
                    {
                        data.description && data.description.split(",")
                            .map((item, index) => (
                                <li key={index}>{item}</li>
                            ))
                    }
                </ul>
            </div>
        )
    }



    return (
        <div className=' bg-white rounded-md p-2'>
            <Heading text={"কোর্স তালিকা"} />
            <DataTable
                columns={columns}
                data={course}
                responsive
                pagination
                highlightOnHover
                expandableRows
                expandableRowsComponent={ExpandedRows}
            />
        </div>
    )
}
