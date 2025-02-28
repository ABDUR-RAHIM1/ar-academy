"use client"
import { postActionUser } from '@/actions/users/postActions';
import { commentReply } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function AddReply({ comment, setComments }) {
    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [isLoading, setIsLoading] = useState(false)
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    const handleReplyClick = (commentId) => {
        setReplyingTo(replyingTo === commentId ? null : commentId);
    };

    const handleReplySubmit = async () => {
        if (replyText.trim() === "") return;
        try {
            setIsLoading(true)
            const replyBody = {
                commentId: comment._id,
                reply: replyText
            };
            const payload = {
                method: "POST",
                api: commentReply,
                body: replyBody
            }
            const { status, data } = await postActionUser(payload);
            if (status === 400 && !data.token) {
                showToast(status, "আপনি এখনো লগ-ইন করেননি !");
                return;
            }
            if (status === 200 || status === 201) {
                // ✅ লোকাল স্টেটে নতুন রিপ্লাই যোগ করা
                router.refresh();
            }
            setReplyText("");
            setReplyingTo(null);
        } catch (error) {
            showToast(500, "Failed to post Reply");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div>
            <div className=' flex justify-end'>
                <button
                    className="color1 mt-2 text-sm  hover:underline"
                    onClick={() => handleReplyClick(comment._id)}
                >
                    উত্তর দিন
                </button>
            </div>
            {/* Reply Input Field */}
            {replyingTo === comment._id && (
                <div className="mt-2 flex items-center gap-2">
                    <input
                        type="text"
                        className="border p-1 rounded-md w-full"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleReplySubmit(comment._id)}
                    >
                        {
                            isLoading ? "Waiting..." : "Submit"
                        }
                    </button>
                </div>
            )}
        </div>

    )
}
