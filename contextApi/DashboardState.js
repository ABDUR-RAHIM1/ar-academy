"use client"

import getToken from "@/actions/getToken/getToken";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
export const contextD = createContext()

export default function DashboardState({ children }) {
    const [token, setToken] = useState("")
    const router = useRouter();
    const [loginSignal, setLoginSignal] = useState({
        signal: false,
        signalType: ""
    })
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [subIdentifier, setSubIdentifer] = useState("")

    const [imgUrl, setImgUrl] = useState("");
    const [uploadResponse, setUploadResponse] = useState({
        message: "",
        status: 0,
    });

    //  use ExamForm.js / ExamTimer.js
    const [usedTime, setUsedTime] = useState(0)


    useEffect(() => {
        const getTokens = async () => {
            const tokenValue = await getToken();
            setToken(tokenValue)
        };
        getTokens()
    }, [])

    // 🔹 File Upload Function
    const uploader = async (file) => {
        if (!file) {
            setUploadResponse({
                message: "No file selected",
                status: 400,
            });
            return;
        }

        const form = new FormData();
        form.append("image", file);

        try {
            setUploadResponse({
                message: "Uploading...",
                status: 102,
            });

            const response = await fetch("https://api.imgbb.com/1/upload?key=862850e874b9b92bba3bbba84383b4dd", {
                method: "POST",
                body: form,
            });

            if (!response.ok) {
                throw new Error("Failed to upload");
            }

            const data = await response.json();
            const uploadedUrl = data.data.url;

            setImgUrl(uploadedUrl);
            setUploadResponse({
                message: "Uploaded successfully",
                status: 200,
            });


        } catch (error) {
            console.error("Error uploading:", error);
            setUploadResponse({
                message: "Failed to upload",
                status: 500,
            });

        }
    };


    //  user information save in localhost (user login or edit profile)
    const handleProfileEditActivity = (profileInfo) => {

        const { plan, password, role, status, ...others } = profileInfo

        const jsonString = JSON.stringify(others); // Step 1: object → string
        const base64Encoded = btoa(unescape(encodeURIComponent(jsonString)));

        localStorage.setItem("ONUSHILON_USER_CACHE", base64Encoded);
    }


    //  user Content end here


    //  admin Context
    const [isOpen, setIsOpen] = useState(true);
    const [editData, setEditData] = useState({});

    // Function to show toast
    // const showToast = (status, data) => {
    //     const message = data.message || data

    //     if (status === 200 || status === 201) {
    //         toast.success(message);
    //         router.refresh();
    //     } else {
    //         toast.error(message);
    //     }
    // };


    const showToast = (status, data, autoClose) => {
        const message = data.message || data;

        const finalAutoClose = typeof autoClose !== "undefined" ? autoClose : (status === 200 || status === 201);

        if (status === 200 || status === 201) {
            toast.success(message, {
                duration: finalAutoClose ? 3000 : Infinity,
                position: "top-right",
                style: {
                    border: '1px solid #4caf50',
                    padding: '12px 16px',
                    color: '#333',
                    background: '#f0fff0',
                    borderRadius: '8px',
                },
                iconTheme: {
                    primary: '#4caf50',
                    secondary: '#fff',
                },
            });
        } else {
            toast.custom((t) => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: '1px solid #f44336',
                    background: '#fff0f0',
                    padding: "12px 16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    minWidth: "300px",
                }}>
                    <div style={{ color: "#333", fontWeight: 500 }}>
                        {message}
                    </div>
                    <button
                        style={{
                            marginLeft: "12px",
                            background: "transparent",
                            border: "none",
                            color: "#f44336",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                        onClick={() => toast.dismiss(t.id)}
                    >
                        ✖
                    </button>
                </div>
            ), { duration: 10000, position: "top-right", });
        }
    };


    const value = {
        token, setToken,
        loginSignal, setLoginSignal,
        imgUrl, uploadResponse, uploader,
        usedTime, setUsedTime,
        showToast, handleProfileEditActivity,
        subIdentifier, setSubIdentifer,
        showSearchBar, setShowSearchBar,
        isOpen, setIsOpen,
        editData, setEditData,
    }


    return (
        <contextD.Provider value={value} >{children}</contextD.Provider>
    )
}
