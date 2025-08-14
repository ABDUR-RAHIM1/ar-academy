"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { postActions } from "@/actions/admins/postActions";
import { classListCreate, subjectListCreate } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import LoadingSpinner from "@/components/spinner-01";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllClassList } from "@/app/apiActions/classList";
export default function AddSubjectForm() {
    const { showToast } = useContext(contextD)
    const [isLoading, setIsLoading] = useState(false)
    const [classListData, setClassListData] = useState([])
    const [classId, setClassId] = useState("")
    const [subjectText, setSubjectText] = useState("");

    const router = useRouter();



    //  get all class List
    useEffect(() => {
        const getData = async () => {
            try {

                const { status, data } = await getAllClassList();
                if (status === 200) {
                    setClassListData(data)
                }

            } catch (error) {
                console.log("failed to get classList")
            }
        };

        getData();

    }, [])


    console.log(classId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const subjectArray = subjectText
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name.length > 0)
            .map((name) => ({ name }));

        if (subjectArray.length === 0) {
            alert("Please enter at least one class");
            return;
        }


        try {
            const body = {
                classId: classId,
                subjects: subjectArray
            }
            const payload = {
                method: "POST",
                api: subjectListCreate,
                body: body
            }
            const { status, data } = await postActions(payload)
  
            showToast(status, data.message)
            if (status === 200 || status === 201) {
                router.refresh
            }

        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Card className="w-full max-w-lg m-auto my-10 shadow-lg border border-gray-200">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                    ➕ Add New Classes
                </CardTitle>
                <p className="text-sm text-gray-500">
                    Enter multiple class names separated by commas.
                    Example: <span className="italic">বাংলা, ইংরেজি, গনিত</span>
                </p>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="classes" className="text-gray-700 font-medium">
                            ক্লাসের নাম
                        </Label>
                        <Select onValueChange={(value) => setClassId(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="ক্লাস বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>ক্লাস</SelectLabel>
                                    {
                                        classListData.map((classList, index) => (
                                            <SelectItem
                                                key={index}
                                                value={classList._id}
                                            >
                                                {classList.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="subject" className="text-gray-700 font-medium">
                            বিষয়ের নাম
                        </Label>
                        <Textarea
                            id="subject"
                            placeholder="e.g. বাংলা, ইংরেজি, গনিত"
                            value={subjectText}
                            onChange={(e) => setSubjectText(e.target.value)}
                            className="mt-2 resize-none"
                            rows={4}
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                        {
                            isLoading ? <LoadingSpinner /> : "বিষয় যুক্ত করুন"
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
