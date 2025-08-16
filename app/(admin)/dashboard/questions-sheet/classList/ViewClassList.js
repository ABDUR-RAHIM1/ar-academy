"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { classListeDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ViewClassList({ data }) {
    const [classList, setClassList] = useState([]);


    useEffect(() => {
        setClassList(data)
    }, [data])

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "70px"
        },
        {
            name: "সিরিয়াল নং:",
            selector: (row) => row.serial || 0,
            width: "120px"
        },
        {
            name: "শ্রেণী",
            selector: (row) => row.name,
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/questions-sheet/classList"} />
        },
        {
            name: "ডিলিট",
            selector: (row) => <DeleteActionButton
                deleteRoute={classListeDelete + row._id}
            />
        },
    ]

    return (
        <div className='px-4 my-10'>

            <DataTable
                title={"ক্লাসের তালিকা"}
                columns={columns}
                data={classList}
                pagination
                highlightOnHover

            />
        </div>
    )
}
