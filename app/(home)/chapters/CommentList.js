import { deleteAction } from '@/actions/admins/deleteAction';
import { commentDelete } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { MdDelete } from 'react-icons/md';
import AddReply from './AddReply';
import { demoProfilePhoto } from "@/Images/Images";

export default function CommentList({ comments, tokenInfo }) {

    const router = useRouter();
    const { showToast } = useContext(contextD);

    const handleDeleteComment = async (commentId) => {

        const commentDeleteEndpoint = commentDelete + commentId
        const { status, data } = await deleteAction(commentDeleteEndpoint);
        showToast(status, data)
        if (status === 200) { 
            router.refresh();
        }

    }
    return (
        <div className="space-y-4">
            { comments && comments.map((comment) => (
                <div key={comment._id} className="p-4 border rounded-lg shadow-sm bg-white">
                    <div className="flex items-center justify-between">
                        <div className="font-bold flex items-center gap-2">
                            <Image
                                src={comment.accountId?.profilePhoto || demoProfilePhoto}
                                alt="User Photo"
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full"
                            />
                            {comment.accountId?.username || "Anonymous User"}
                        </div>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className=" flex items-center gap-3">
                        <p className="mt-2 text-gray-800 border-l-2 border-blue-500 px-2">{comment.comment}</p>
                        {/* 🗑 Delete button  */}
                        {
                            comment.accountId?._id === tokenInfo?.id &&
                            <button
                                className="py-1  text-red-500 text-xl"
                                onClick={() => handleDeleteComment(comment._id)}
                            >
                                <MdDelete />
                            </button>
                        }
                    </div>

                    {/* Reply Button */}
                    <AddReply comment={comment} />

                    {/* Replies Section */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 ml-4 border-l-2 border-blue-400 pl-4">
                            {comment.replies.map((reply, index) => (
                                <div key={index} className="my-3 flex items-center gap-2 border-t pt-2">
                                    <Image
                                        src={reply?.profilePhoto || demoProfilePhoto}
                                        alt="User Photo"
                                        width={40}
                                        height={40}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {reply.accountName || "Anonymous User"}:
                                        </p>

                                        <div className=" flex items-center gap-3">
                                            <p>{reply.reply}</p>
                                            {/* 🗑 Delete button  */}
                                            {
                                                reply.accountId === tokenInfo?.id &&
                                                <button
                                                    className="py-1  text-red-500 text-xl"
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                >
                                                    <MdDelete />
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
