"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { categorieDelete, categoriePutDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function CategorieTable({ categories }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (categories) {
            setData(categories)
        }
    }, [categories]);

    const columns = [
        {
            name: "Position",
            selector: (row, index) => row.position || 0,
            width: "120px"
        },
        {
            name: "Categorie",
            selector: (row) => <div className=' my-3' title={row.identifier}>
                {row.categorie}
            </div>,
            width: "200px"
        },
        {
            name: "Description",
            selector: (row) => <div className=' my-3'>
                {row.description}
            </div>,
            width: "250px",
            wrap: true
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/categories/edit"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteActionButton deleteRoute={categorieDelete + row._id} />
        },
    ]


    return (
        <div>
            <DataTable
                title={"Categories List"}
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    )
}
