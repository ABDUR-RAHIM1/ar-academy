"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { chapterDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getSubCategorie } from '@/app/apiActions/admin/adminApi';

export default function ChaptersTable({ chaptersData }) {
    const [subCategorie, setSubCategorie] = useState([]);
    const [selectValue, setSelectValue] = useState("all");
    const [data, setData] = useState([]);

    useEffect(() => {

        if (chaptersData) {

            let filteredData = chaptersData;
            if (selectValue !== "all") {
                filteredData = chaptersData.filter(item => item.sub_categorie_id === selectValue)
            }
            setData(filteredData)

        }

    }, [chaptersData, selectValue]);



    //  get all sub Categories for select fiedl (filtering chapters)
    useEffect(() => {
        const subCData = async () => {
            const { status, data } = await getSubCategorie();

            if (status === 200 && data) {
                setSubCategorie(data)
            }

        };
        subCData()
    }, [])

    //  categorie Change handler
    const handleCategorieChange = (sub_categorie_id) => {
        setSelectValue(sub_categorie_id)
    }


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px"
        },
        {
            name: "Position",
            selector: (row, index) => row.position || "-" + (index + 1),
            width: "100px"
        },
        {
            name: "Chapter",
            selector: (row) => <div className=' my-3' title={row.identifier}>
                {row.chapter_name}
            </div>,
            wrap: true,
            width: "180px",
        },
        {
            name: "access type",
            selector: (row) => row?.type,
            cell: (row) => (
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded 
                ${row?.type === "paid"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {row?.type === "paid" ? "প্রিমিয়াম" : "বিনামূল্যে"}
                </span>
            ),
            sortable: true,
        },
        {
            name: "FIle Type",
            selector: (row) =>
                row.fileType === "file" ? (
                    <p className="text-red-700 bg-red-100 px-2 py-1 text-sm rounded-full w-fit">File</p>
                ) : (
                    <p className="text-green-700 bg-green-100 px-2 py-1 text-sm rounded-full w-fit">Editor</p>
                )
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/chapters/edit"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteActionButton deleteRoute={chapterDelete + row._id} />
        },
    ]

    return (
        <div className=' py-10 px-3 bg-white'>

            <div className=' my-4 flex items-center justify-end'>
                <Select onValueChange={handleCategorieChange}>
                    <SelectTrigger className="w-[180px] ">
                        <SelectValue placeholder="সাবজেক্ট অনুযায়ী খুজুন" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            subCategorie && subCategorie.length > 0 ?
                                subCategorie.map((sub, idx) => (
                                    <SelectItem
                                        key={`${sub._id}-${idx}`}
                                        value={sub._id}
                                    >
                                        {sub.sub_name}
                                    </SelectItem>
                                ))
                                : ""
                        }
                    </SelectContent>
                </Select>
            </div>


            <DataTable
                // title={"Chapters"}
                data={data}
                columns={columns}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15, 20, data?.length]}
                highlightOnHover
            />
        </div>
    )
}
