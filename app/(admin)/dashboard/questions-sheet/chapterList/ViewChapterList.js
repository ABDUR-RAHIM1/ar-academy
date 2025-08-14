"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import { chapterListDelete, subjectListeDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ViewChapterList({ data }) {
    const [subjectList, setSubjectList] = useState([]);


    useEffect(() => {
        setSubjectList(data)
    }, [data])


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "70px"
        },
        {
            name: "শ্রেণী",
            selector: (row) => row.classId?.name || "N/A",
            // width: "150px"
        },
        {
            name: "বিষয়",
            selector: (row) => row.subjectId?.name || "N/A"
            //   width: "150px"
        },
        {
            name: "চ্যাপ্টার",
            selector: (row) => row.name || "N/A"
            //   width: "150px"
        },

        // {
        //     name: "Edit",
        //     selector: (row) => <EditActionButton data={row} path={"/dashboard/questions-sheet/classList"} />
        // },
        {
            name: "ডিলিট",
            selector: (row) => <DeleteActionButton
                deleteRoute={chapterListDelete + row._id}
            />
        },
    ]

    return (
        <div className='px-4 my-10'>

            <DataTable
                title={"সাবজেক্ট তালিকা"}
                columns={columns}
                data={subjectList}
                pagination
                highlightOnHover

            />
        </div>
    )
}
