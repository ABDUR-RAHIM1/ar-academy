"use client"
import React, { useContext, useEffect, useState } from 'react'
import { InputField } from '@/utils/InputFIled'
import SubmitButton from '@/utils/SubmitButton'
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
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
import { createSubCategories } from '@/constans';

export default function AddSubject() {
    const { showToast } = useContext(contextD);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ sub_name: "", description: "", categorieId: "", type: "free" })

    const [categorie, setCategorie] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
 
            setFormData({ ...formData, [name]: value })

    };


    const handleCategorieChange = (categorieId) => {
        setFormData((prev) => ({
            ...prev,
            categorieId: categorieId
        }))
    };


    // handle Type Change
    const handleTypeChange = (typeValue) => {
        setFormData((prev) => ({
            ...prev,
            type: typeValue
        }))
    }

    //  get all categories
    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getCategories();
            if (status === 200) {
                setCategorie(data)
            }
        };

        getCategorieData()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                method: "POST",
                api: createSubCategories, // form constans
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
                <h2>Add Sub Categorie</h2>
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

                </div>
                <SubmitButton loadingState={loading} btnText={"Add Sub Categorie"} />
            </form>
        </div>
    )
}
