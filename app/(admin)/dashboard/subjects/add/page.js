"use client"
import React, { useContext, useEffect, useState } from 'react'
import { InputField } from '@/utils/InputFIled'
import SubmitButton from '@/utils/SubmitButton'
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
import useFileUploader from '@/utils/fileUploader';

export default function AddSubject() {
    const { uploader, imgUrl } = useFileUploader()
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", coverPhoto: null })

    const handleChange = (e) => {
        const { type, name, value } = e.target;

        if (type === "file") {
            uploader(e.target.files[0])
        } else {
            setFormData({ ...formData, [name]: value })
        }

    };
 

    useEffect(() => {
        if (imgUrl) {
            setFormData({
                ...formData,
                coverPhoto: imgUrl
            })
        }
    }, [imgUrl])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { status, data } = await postActions("/api/subject", formData);
            console.log(status, data);
            showToast(status, data?.message)

        } catch (error) {
            console.log(error);
            showToast(500, "Failed To Post")
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className='addFormWrap'>
            <form onSubmit={handleSubmit}>
                <h2>Add Subject List</h2>
                <div>
                    <InputField
                        name={"name"}
                        placeholder={"Enter Subject Name"}
                        handler={handleChange}
                    />
                    <InputField
                        type={"textarea"}
                        name={"description"}
                        placeholder={"Enter Subject description"}
                        handler={handleChange}
                    />
                    <InputField
                        type={"file"}
                        name={"coverPhoto"}
                        placeholder={"Enter Subject Cover Photo"}
                        handler={handleChange}
                    />
                </div>
                <SubmitButton loadingState={loading} text={"Subject"} />
            </form>
        </div>
    )
}
