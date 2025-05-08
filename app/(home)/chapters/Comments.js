"use client"; 
import { useContext, useEffect, useState } from "react";
import { postActionUser } from "@/actions/users/postActions";
import { commentCreate } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import { getCommentsByChapterId } from "@/app/apiActions/comments";
import { decodedToken } from "@/helpers/token-decoded/tokenDecoded";
import CommentList from "./CommentList";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

export const CommentSection = ({ chapterId }) => { 
    const [tokenInfo, setTokenInfo] = useState(null)
    const { showToast, token } = useContext(contextD);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentFormData, setCommentFormData] = useState({
        chapterId: chapterId,
        comment: "",
    });

    useEffect(() => {
        const getComments = async () => {
            const { status, data } = await getCommentsByChapterId(chapterId);
            if (status === 200 && data.data) {
                setComments(data.data);
            }

            const info = await decodedToken();
            setTokenInfo(info)

        };
        getComments();
    }, [chapterId]);

    const handleCommentChange = (e) => {
        setCommentFormData((prev) => ({
            ...prev,
            comment: e.target.value,
        }));
    };

    const handleSubmitComment = async () => {
        if (!token) {
            showToast(400, "আপনি এখনো লগ-ইন করেননি !");
            return;
        }
        try {
            if (commentFormData.comment === "") {
                return showToast(500, "Comment Empty");
            }
            setIsLoading(true);
            const payload = {
                method: "POST",
                api: commentCreate,
                body: commentFormData,
            };

            const { status, data } = await postActionUser(payload);

            showToast(status, data);

            if (status === 200 || status === 201) {
                const { status: getStatus, data: getData } =
                    await getCommentsByChapterId(chapterId);
                if (getStatus === 200 && getData.data) {
                    setComments(getData.data);
                }
            }
        } catch (error) {
            console.log("Failed to post comment");
            showToast(500, "Failed to post comment");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-10 p-4 border rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-3">কমেন্ট করুন</h2>

            {/* মন্তব্যের ইনপুট ফিল্ড */}
            <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
                placeholder="Write a comment..."
                value={commentFormData.comment}
                onChange={handleCommentChange}
            ></textarea>

            {/* সাবমিট বাটন */}
            <button
                className="mt-3 px-4 py-2 bg1 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleSubmitComment}
            >
                {isLoading ? "Please Wait ..." : < IoCheckmarkDoneCircleSharp className=' text-2xl' />}
            </button>

            {/* মন্তব্য তালিকা */}
            <div className="my-10">
                <h4 className="font-bold">
                    এখানে <span className="text-blue-500">{comments?.length}</span> জন মন্তব্য করেছেন, আপনিও করুন!
                </h4>
                {comments && comments.length > 0 ? (
                    <CommentList comments={comments} tokenInfo={tokenInfo} />
                ) : (
                    <p className="mt-4 text-gray-500">কোন মন্তব্য নেই</p>
                )}
            </div>
        </div>
    );
};

