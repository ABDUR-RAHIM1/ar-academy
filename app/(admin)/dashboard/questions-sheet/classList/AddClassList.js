"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { postActions } from "@/actions/admins/postActions";
import { classListCreate } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import LoadingSpinner from "@/components/spinner-01";
import { useRouter } from "next/navigation";

export default function AddClassForm() {
    const { showToast } = useContext(contextD)
    const [isLoading, setIsLoading] = useState(false)
    const [classText, setClassText] = useState("");
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const classesArray = classText
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name.length > 0)
            .map((name) => ({ name }));

        if (classesArray.length === 0) {
            alert("Please enter at least one class");
            return;
        }

        try {
            const payload = {
                method: "POST",
                api: classListCreate,
                body: classesArray
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
                    Example: <span className="italic">প্রথম শ্রেণি, দ্বিতীয় শ্রেণি, তৃতীয় শ্রেণি</span>
                </p>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="classes" className="text-gray-700 font-medium">
                            Class Names
                        </Label>
                        <Textarea
                            id="classes"
                            placeholder="e.g. প্রথম শ্রেণি, দ্বিতীয় শ্রেণি, তৃতীয় শ্রেণি"
                            value={classText}
                            onChange={(e) => setClassText(e.target.value)}
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
                            isLoading ? <LoadingSpinner /> : "Add Class"
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
