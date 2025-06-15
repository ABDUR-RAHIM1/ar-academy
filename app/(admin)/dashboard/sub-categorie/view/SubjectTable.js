"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { subCategoriesDelete } from '@/constans';
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
            name: "index",
            selector: (row, index) => index + 1
        },
        {
            name: "sub Categorie",
            selector: (row) => row.sub_name
        },
        {
            name: "Type",
            selector: (row) =>
                row.type === "paid" ? (
                    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full border border-red-300 shadow-sm">
                        Paid
                    </span>
                ) : (
                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full border border-green-300 shadow-sm">
                        Free
                    </span>
                )
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
            selector: (row) => <DeleteActionButton deleteRoute={subCategoriesDelete + row._id} />
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
