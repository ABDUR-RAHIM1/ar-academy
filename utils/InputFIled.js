"use client"
import React from 'react'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import useFileUploader from './fileUploader'
import { uploaderStyle } from './uploadStyle'

export function InputField({ width, type, name, required, placeholder, handler }) {
    const { uploadResponse } = useFileUploader();

    const { status, message } = uploadResponse;

    const fileStyle = uploaderStyle(status);

    return (
        <>
            {
                type === "textarea" ?
                    <div style={{ margin: "15px 0px" }} className={`${width || "w-full"}`}>
                        <Label htmlFor={name}>{name}</Label>
                        <Textarea
                            name={name}
                            required={required || true}
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
                                required={required || true}
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
                                required={required || true}
                                placeholder={placeholder || name}
                                onChange={handler}
                                id={name}
                            />
                        </div>
            }
        </>
    )
}


// export default function InputFIled({ width, type, name, required, placeholder, handler }) {
//     return (
//         <div className={width || "w-full"}>
//             <label htmlFor={name} className=' mb-2 font-medium text-gray-700 capitalize'>{name}</label>
//             <input
//                 type={type || "text"}
//                 name={name}
//                 required={required || true}
//                 placeholder={placeholder || name}
//                 onChange={handler}
//                 id={name}
//                 className='w-full p-2 rounded-md border-1 border-gray-800 focus:outline-gray-700 placeholder:bg-gray-600'
//             />
//         </div>
//     )
// }
