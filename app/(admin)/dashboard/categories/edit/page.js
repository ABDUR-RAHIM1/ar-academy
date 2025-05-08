"use client"
import React, { useContext, useEffect, useState } from 'react'
import { InputField } from '@/utils/InputFIled'
import SubmitButton from '@/utils/SubmitButton'
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
import { categorieUpdate } from '@/constans';

export default function EditCategories() {
    const { showToast, editData } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ position: "", categorie: "", description: "", coverPhoto: null })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value })

    };

    useEffect(() => {
        if (editData !== null) {
            setFormData(editData)
        }
    }, [editData])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        try {
            const payload = {
                method: "PUT",
                api: categorieUpdate + formData._id,
                body: formData
            }
            const { status, data } = await postActions(payload);
            showToast(status, data)

        } catch (error) {
            showToast(500, "Failed To Post")
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className='addFormWrap'>
            <form onSubmit={handleSubmit}>
                <h2>Edit Categorie</h2>
                <div>
                    <InputField
                        type={"number"}
                        name={"position"}
                        value={formData.position}
                        placeholder={"Postion Number"}
                        handler={handleChange}
                    />
                    <InputField
                        name={"categorie"}
                        value={formData.categorie}
                        placeholder={"Enter Categorie Name"}
                        handler={handleChange}
                    />

                    <InputField
                        type={"textarea"}
                        name={"description"}
                        value={formData.description}
                        placeholder={" description (optional)"}
                        handler={handleChange}
                        required={false}
                    />

                </div>
                <SubmitButton loadingState={loading} btnText={"Update The Categorie"} />
            </form>
        </div>
    )
}
