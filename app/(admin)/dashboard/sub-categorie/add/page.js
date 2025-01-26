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
    const [formData, setFormData] = useState({ subjectName: "", username: "", description: "", coverPhoto: null })

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
            const payload = {
                method: "POST",
                api: "/api/subject",
                body: formData
            }
            const { status, data } = await postActions(payload);
            console.log(data)
            showToast(status, data)

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
                        name={"subjectName"}
                        value={formData.subjectName}
                        placeholder={"Enter Subject Name"}
                        handler={handleChange}
                    />
                    <InputField
                        name={"username"}
                        value={formData.username}
                        placeholder={"Subject username"}
                        handler={handleChange}
                    />
                    <InputField
                        type={"textarea"}
                        name={"description"}
                        value={formData.description}
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
                <SubmitButton loadingState={loading} btnText={"Add A Subject"} />
            </form>
        </div>
    )
}
