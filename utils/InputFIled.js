import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

export function InputField({ width, type, name, value, required, label, placeholder, handler }) {

    const isRequired = required !== undefined ? required : true;

    const renderInputField = () => {
        switch (type) {
            case "textarea":
                return (
                    <div  className={`${width || "w-full"} my-[10px] md:my-[15px] `}>
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
                );
            default:
                return (
                    <div   className={`${width || "w-full"} my-2 md:my-5 `}>
                        <Label htmlFor={name}>{label || name}</Label>
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
                );
        }
    };

    return renderInputField();
}
