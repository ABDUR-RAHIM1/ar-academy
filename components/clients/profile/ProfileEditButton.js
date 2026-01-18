"use client"

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import { contextD } from "@/contextApi/DashboardState";
import { uploaderStyle } from "@/utils/uploadStyle";
import { userAccountUpdate } from "@/constans";
import { postActionUser } from "@/actions/users/postActions";
import { useRouter } from "next/navigation";

export function ProfileEditButton({ user }) {
    const { uploader, uploadResponse, imgUrl, showToast } = useContext(contextD);
    const { status, message: uploadMessage } = uploadResponse;
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: user?.username || "",
        accountMethod: user?.email ? "email" : "phone",
        email: user?.email || "",
        phone: user?.phone || "",
        newPassword: "",
        photo: user?.photo || ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {

            uploader(files[0])

        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

    }


    /** ==========  Set Image Url In The Main State ============= */
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            photo: imgUrl
        }))
    }, [imgUrl])
    /** ==========  Set Image Url In The Main State ============= */


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {


            const payload = {
                method: "PUT",
                api: userAccountUpdate + user._id,
                body: formData
            };

            const { status, data } = await postActionUser(payload);
            router.refresh()
            showToast(status, data)

        } catch (err) {
            console.error(err);
            setMessage("Something went wrong");
            showToast("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Edit size={20} />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <DialogHeader>
                        <DialogTitle>প্রোফাইল আপডেট করুন</DialogTitle>
                        <DialogDescription>
                            যে তথ্যগুলো আপডেট করতে চান তা লিখে আপনার পাসওয়ার্ড দিয়ে সাবমিট দিন।
                        </DialogDescription>
                    </DialogHeader>



                    {/* Username */}
                    <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Account Method + Email/Phone in one line */}
                    <div className="grid gap-1">
                        <Label>Account Method</Label>
                        <div className="flex gap-2">
                            <select
                                id="accountMethod"
                                name="accountMethod"
                                value={formData.accountMethod}
                                onChange={handleChange}
                                className="border rounded px-3 py-2 w-[100px]"
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </select>

                            {formData.accountMethod === "email" ? (
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="flex-1"
                                />
                            ) : (
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="flex-1"
                                />
                            )}
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Profile Photo */}
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">Profile Photo</Label>
                        <Input
                            id="photo"
                            name="photo"
                            type="file"
                            onChange={handleChange}
                        />
                        <small style={uploaderStyle(status)} className={`my-2 inline-block`}>
                            {uploadMessage}
                        </small>
                    </div>



                    {message && <p className="text-sm text-red-500">{message}</p>}

                    <DialogFooter className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading || status === 100}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
