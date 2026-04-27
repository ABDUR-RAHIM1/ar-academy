import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { AlertTriangle, Check } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";
import { IoClose } from "react-icons/io5";
import { MdError } from "react-icons/md";

export default function TabChangeAlert({
    open,
    alertType,
    onClose,

}) {
    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className=" w-[90%] md:max-w-md text-center space-y-4">

                {/* 🔥 REQUIRED FOR RADIX */}
                <DialogHeader>
                    <DialogTitle>
                        <VisuallyHidden>
                            ট্যাব পরিবর্তন ডিটেকটেড
                        </VisuallyHidden>
                    </DialogTitle>
                </DialogHeader>

                {alertType === "warning" && (
                    <div className="space-y-4 flex flex-col items-center text-center">

                        {/* 🔶 Icon */}
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <AlertTriangle className="text-yellow-600 w-6 h-6" />
                        </div>

                        {/* 🔶 Title */}
                        <h2 className="text-yellow-600 text-lg font-semibold">
                            সতর্কতা
                        </h2>

                        {/* 🔶 Message */}
                        <p className="text-gray-600">
                            আর একবার ট্যাব পরিবর্তন করলে পরীক্ষা নিজে থেকে সাবমিট হয়ে যাবে!
                        </p>

                        {/* 🔶 Button */}
                        <Button
                            onClick={() => onClose(false)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            সম্মত
                        </Button>
                    </div>
                )}

                {alertType === "submit" && (
                    <div className=" space-y-4 flex flex-col items-center text-center">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <MdError className="text-yellow-600 w-6 h-6" />
                        </div>
                        <h2 className="text-red-500 text-lg font-semibold">
                            অবৈধ চেষ্টা
                        </h2>
                        <p>
                            আপনি আবার ট্যাব পরিবর্তন করেছেন! তাই পরীক্ষা সাবমিট হচ্ছে...
                        </p>
                        <Button
                            onClick={() => onClose(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6"
                        >
                            <IoClose className="w-4 h-4 mr-2" />
                            বন্ধ করুন
                        </Button>
                    </div>
                )}


            </DialogContent>
        </Dialog>
    );
}