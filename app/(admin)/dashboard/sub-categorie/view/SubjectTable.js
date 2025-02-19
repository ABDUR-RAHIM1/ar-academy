"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { subCategoriePutDelete } from '@/constans';
import { bookCover } from '@/Images/Images';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function SubjectTable({ sub_categories }) {
    const [data, setData] = useState([]);


    useEffect(() => {
        if (sub_categories) {
            setData(sub_categories)
        }
    }, [sub_categories]);


    const columns = [
        {
            name: "cover photo",
            selector: (row) => <Image
                width={50}
                height={50}
                src={row.coverPhoto || bookCover}
                alt='AR Academy BD'
                className=' w-20 h-20 rounded-md my-3'
            />
        },
        {
            name: "sub Categorie",
            selector: (row) => row.sub_name
        },
        {
            name: "Type",
            selector: (row) => row.type === "paid" ? <p className=' text-red-600 bg-red-200 px-2 py-1 text-sm'>Paid</p> : <p className=' color1 bg2 px-2 py-1 text-sm'>Free</p>
        },
        {
            name: "Description",
            selector: (row) => row.description ? <span className=' text-blue-800'>
                {row.description}
            </span> : <p className=' text-red-900'>
                কোন টেক্সট নাই
            </p>
        },
        {
            name: "identifier",
            selector: (row) => row.identifier
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/sub-categorie/edit"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteActionButton deleteRoute={subCategoriePutDelete + row._id} />
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
