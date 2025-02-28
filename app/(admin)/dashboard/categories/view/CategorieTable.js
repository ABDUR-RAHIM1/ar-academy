"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { categoriePutDelete } from '@/constans';
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
            selector: (row, index) => row.position || 0
        },
        {
            name: "Categorie",
            selector: (row) => row.categorie
        },
        {
            name: "Identifier",
            selector: (row) => row.identifier
        },
        {
            name: "Edit",
            selector: (row) => <EditActionButton data={row} path={"/dashboard/categories/edit"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteActionButton deleteRoute={categoriePutDelete + row._id} />
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
