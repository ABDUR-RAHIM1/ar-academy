"use client"
import React, { useContext, useEffect, useState } from 'react'
import { InputField } from '@/utils/InputFIled'
import SubmitButton from '@/utils/SubmitButton'
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
import useFileUploader from '@/utils/fileUploader';
import { subjectPutDelete } from '@/constans'; 

export default function EditSubject() { 
    const { editSubject } = useContext(contextD);
    const { uploader, imgUrl } = useFileUploader()
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", coverPhoto: null });


    const handleChange = (e) => {
        const { type, name, value } = e.target;

        if (type === "file") {
            uploader(e.target.files[0])
        } else {
            setFormData({ ...formData, [name]: value })
        }

    };

    //  editable Data set In FormData
    useEffect(() => {
        if (editSubject !== null) {
            setFormData(editSubject)
        }
    }, [editSubject])

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
                method: "PUT",
                api: subjectPutDelete + formData._id,
                body: formData
            }
            const { status, data } = await postActions(payload);
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
                <h2>Edit Subject</h2>
                <div>
                    <InputField
                        name={"name"}
                        value={formData.name}
                        placeholder={"Enter Subject Name"}
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
                        required={false}
                        placeholder={"Enter Subject Cover Photo"}
                        handler={handleChange}
                    />
                </div>
                <SubmitButton loadingState={loading} btnText={" Update The Subject"} />
            </form>
        </div>
    )
}
