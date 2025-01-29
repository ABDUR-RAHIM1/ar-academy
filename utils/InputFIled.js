"use client"
import React from 'react'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import useFileUploader from './fileUploader'
import { uploaderStyle } from './uploadStyle'

export function InputField({ width, type, name, value, required, label, placeholder, handler }) {
    const { uploadResponse } = useFileUploader();

    const { status, message } = uploadResponse;

    const fileStyle = uploaderStyle(status);
    const isRequired = required !== undefined ? required : true;

    return (
        <>
            {
                type === "textarea" ?
                    <div style={{ margin: "15px 0px" }} className={`${width || "w-full"}`}>
                        <Label htmlFor={name}>{label || name}</Label>
                        <Textarea
                            name={name}
                            value={value}
                            required={isRequired}
                            placeholder={placeholder || name}
                            onChange={handler}
                            id={name}
                        />
                    </div>
                    : type === "file" ?
                        <div style={{ margin: "15px 0px" }} className={`${width || "w-full"}`}>
                            <Label htmlFor={name} style={fileStyle}>{message || name}</Label>
                            <Input
                                type={"file"}
                                name={name}
                                required={isRequired}
                                placeholder={placeholder || name}
                                onChange={handler}
                                id={name}
                            />
                        </div>
                        :
                        <div style={{ margin: "15px 0px" }} className={`${width || "w-full"}`}>
                            <Label htmlFor={name}>{name}</Label>
                            <Input
                                type={type || "text"}
                                name={name}
                                value={value}
                                required={isRequired}
                                placeholder={placeholder || name}
                                onChange={handler}
                                id={name}
                            />
                        </div>
            }
        </>
    )
}


