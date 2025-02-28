"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { postActionUser } from "@/actions/users/postActions";
import { getCommentsByChapterId } from "@/app/apiActions/client/clientApi";
import { commentPostGetAll } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import Image from "next/image";
import { demoProfilePhoto } from "@/Images/Images";
import AddReply from "./AddReply";


export const CommentSection = ({ chapterId }) => {

    const router = useRouter();
    const { showToast } = useContext(contextD);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentFormData, setCommentFormData] = useState({
        chapterId: chapterId,
        comment: "",
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5; // প্রতি পেজে দেখানোর জন্য মন্তব্যের সংখ্যা

    useEffect(() => {
        const getComments = async () => {
            const { status, data } = await getCommentsByChapterId(chapterId);
            if (status === 200 && data.data) {
                setComments(data.data);
            }
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
        try {
            if (commentFormData.comment === "") {
                return showToast(500, "Comment Empty");
            }
            setIsLoading(true);
            const payload = {
                method: "POST",
                api: commentPostGetAll,
                body: commentFormData,
            };

            const { status, data } = await postActionUser(payload);
            if (status === 400 && !data.token) {
                showToast(status, "আপনি এখনো লগ-ইন করেননি !");
                return;
            }
            showToast(status, data);

            if (status === 200 || status === 201) {
                // নতুন মন্তব্য পোস্ট হওয়ার পর, তালিকা রিফ্রেশ করা
                const { status: getStatus, data: getData } =
                    await getCommentsByChapterId(chapterId);
                if (getStatus === 200 && getData.data) {
                    setComments(getData.data);
                    setCurrentPage(1); // পেজ রিসেট করা (ঐচ্ছিক)
                }
            }
        } catch (error) {
            console.log("Failed to post comment");
            showToast(500, "Failed to post comment");
        } finally {
            setIsLoading(false);
        }
    };

    // পেজিনেশনের জন্য মন্তব্যগুলোর সাবসেট নির্ধারণ করা
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                {isLoading ? "Please Wait ..." : "কমেন্ট"}
            </button>

            {/* মন্তব্য তালিকা এবং পেজিনেশন */}
            <div className="my-10">
                <h4 className="font-bold">
                    এখানে <span className="text-blue-500">{comments?.length}</span> জন
                    মন্তব্য করেছেন, আপনিও করুন!
                </h4>
                {comments && comments.length > 0 ? (
                    <>
                        <CommentList comments={currentComments} setComments={setComments} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <p className="mt-4 text-gray-500">কোন মন্তব্য নেই</p>
                )}
            </div>
        </div>
    );
};



const CommentList = ({ comments }) => {

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment._id} className="p-4 border rounded-lg shadow-sm bg-white">
                    <div className="flex items-center justify-between">
                        <div className="font-bold flex items-center gap-2">
                            <Image
                                src={comment.accountId.profilePhoto || demoProfilePhoto}
                                alt="User Photo"
                                width={40}
                                height={40}
                                className="w-8 h-8 rounded-full"
                            />
                            {comment.accountId?.username || "Anonymous User"}
                        </div>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="mt-2 text-gray-800 border-l-2 border-blue-500 px-2">{comment.comment}</p>
                    <button className=" px-2 py-1 rounded-md bg-red-500 text-white font-medium">delete</button>

                    {/* Reply Button */}
                    <AddReply comment={comment} />


                    {/* Replies Section */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 ml-4  border-l-2 border-blue-400 pl-4">
                            {comment.replies.map((reply, index) => (
                                <div key={index} className="my-3 flex items-center gap-2 border-t">
                                    <Image
                                        src={reply.profilePhoto || demoProfilePhoto}
                                        alt="User Photo"
                                        width={40}
                                        height={40}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {reply.accountName || "Anonymous User"}:
                                        </p>

                                        <p>{reply.reply}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


//  paginations
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return (
        <div className="flex justify-center mt-6 space-x-2">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};
