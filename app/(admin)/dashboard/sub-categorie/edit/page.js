"use client"
import React, { useContext, useEffect, useState } from 'react'
import { InputField } from '@/utils/InputFIled'
import SubmitButton from '@/utils/SubmitButton'
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
import { subCategoriePutDelete, subCategoriesUpdate } from '@/constans';
import { getCategories } from '@/app/apiActions/client/clientApi';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { uploaderStyle } from '@/utils/uploadStyle';




export default function EditSubject() {
    const { showToast, imgUrl, uploadResponse, uploader, editData } = useContext(contextD);
    const { status, message } = uploadResponse;
    const costomStyle = uploaderStyle(status);


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ sub_name: "", description: "", categorieId: "", type: "free", coverPhoto: "" })

    const [categorie, setCategorie] = useState([])

    const handleChange = (e) => {
        const { type, name, value } = e.target;

        if (type === "file") {
            uploader(e.target.files[0])
        } else {
            setFormData({ ...formData, [name]: value })
        }

    };


    //  image url set in the state
    useEffect(() => {
        if (imgUrl) {
            setFormData((prev) => ({
                ...prev,
                coverPhoto: imgUrl
            }))
        }
    }, [imgUrl])

    const handleCategorieChange = (categorieId) => {
        setFormData((prev) => ({
            ...prev,
            categorieId: categorieId
        }))
    };

    // handle Type Change
    const handleTypeChange = (typeValue) => {
        console.log("typeValue", typeValue);

        setFormData((prev) => ({
            ...prev,
            type: typeValue
        }))
    }

    //  get all categorie  item and set Select Field
    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getCategories();
            if (status === 200) {
                setCategorie(data)
            }
        };

        getCategorieData()
    }, [])

    //  editable Data set In FormData
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
                api: subCategoriesUpdate + formData._id,
                body: formData
            };

            const { status, data } = await postActions(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error)
            showToast(500, "Failed To Update")
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className='addFormWrap'>
            <form onSubmit={handleSubmit}>
                <h2>Edit Sub Categorie</h2>
                <div>
                    <Select name='categorieId'
                        onValueChange={handleCategorieChange}

                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Categorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel> Categories</SelectLabel>
                                {
                                    categorie && categorie.length > 0 ?
                                        categorie.map((CItem, index) => (
                                            <SelectItem key={index} value={CItem._id}>
                                                {`${CItem.categorie} (${CItem.identifier})`}
                                            </SelectItem>
                                        ))
                                        : null
                                }

                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <InputField
                        name={"sub_name"}
                        value={formData.sub_name}
                        placeholder={"Enter Subject Name"}
                        handler={handleChange}
                    />

                    <InputField
                        name={"description"}
                        value={formData.description}
                        placeholder={"Write Short Description"}
                        handler={handleChange}
                        required={false}
                    />

                    <div className=" my-4">
                        <Select name='type'
                            onValueChange={handleTypeChange}

                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={"ধরণ"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        স্ট্যাটাস
                                    </SelectLabel>

                                    <SelectItem value={"free"}>Free</SelectItem>
                                    <SelectItem value={"paid"}>Paid</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className=' my-4'>
                        <Label htmlFor={"coverPhoto"} style={costomStyle} >{message || "Cover Photo"}</Label>
                        <Input
                            type={"file"}
                            name={"coverPhoto"}
                            required={false}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <SubmitButton loadingState={loading} btnText={" Update Sub Categorie"} />
            </form>
        </div>
    )
}
