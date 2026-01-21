"use client"
import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/utils/InputFIled';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { packageCreate } from '@/constans';
import { postActions } from '@/actions/admins/postActions';
import { contextD } from '@/contextApi/DashboardState';
import LoadingSpinner from '@/components/spinner-01';
import { Input } from '@/components/ui/input';

export default function PackageAdd() {
    const [loading, setLoading] = useState(false)
    const { showToast } = useContext(contextD)
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        price: 0,
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Shadcn Select er jonno alada handler
    const handleSelectChange = (value) => {
        setFormData(prev => ({
            ...prev,
            duration: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {


            const payload = {
                method: "POST",
                api: packageCreate,
                body: formData
            };

            const { status, data } = await postActions(payload);
            showToast(status, data)



        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }

    };

    return (
        <div className='w-full md:w-[70%] lg:w-[50%] m-auto rounded-md p-8 bg-white shadow-md my-10 border border-gray-100'>

            <div className={"text-center mb-10 space-y-2"}>
                <h2 className={"text-2xl font-bold text-gray-800"}>Add New Package</h2>
                <p className='text-sm text-gray-500'>(Only accessible by Sub Admin)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Package Name */}
                <InputField
                    label="Package Name"
                    name="name"
                    placeholder="Enter package name"
                    value={formData.name}
                    handler={handleChange}
                />

                {/* Duration Select Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select onValueChange={handleSelectChange} value={formData.duration}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Duration Options</SelectLabel>
                                <SelectItem value="1">1 Month</SelectItem>
                                <SelectItem value="3">3 Months</SelectItem>
                                <SelectItem value="6">6 Months</SelectItem>
                                <SelectItem value="12">1 Year</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Price Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <Input
                        name="price"
                        placeholder="Package Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                {/* Description Textarea */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <Textarea
                        name="description"
                        placeholder="Write package details here..."
                        value={formData.description}
                        onChange={handleChange}
                        className="min-h-[120px]"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-6 text-lg font-semibold"
                >
                    {
                        loading ? <LoadingSpinner /> : " Create Package"
                    }
                </Button>
            </form>
        </div>
    );
}