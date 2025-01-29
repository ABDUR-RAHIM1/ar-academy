"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { chapters } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ChaptersTable({ chaptersData }) {
    const [data, setData] = useState([]);

    useEffect(() => {

        if (chaptersData) {
            setData(chaptersData)
        }

    }, [chaptersData]);


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1
        },
        {
            name: "Chapter",
            selector: (row) => row.chapter_name
        },
        {
            name: "Identifier",
            selector: (row) => row.identifier
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/chapters/edit"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteActionButton deleteRoute={chapters + row._id} />
        },
    ]

    return (
        <div>
            <DataTable
                title={"Chapters"}
                data={data}
                columns={columns}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15, 20 , data?.length]} 
                highlightOnHover
            />
        </div>
    )
}
