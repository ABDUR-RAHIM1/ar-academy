"use client"
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css'; // Katex styling

export default function EditorSolutions({ markdownContent }) {

    return (
        <div className="markdown prose p-4 border border-gray-200 rounded bg-white shadow-sm mb-6  overflow-y-auto overflow-x-hidden">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                // components={{
                //     table: ({ node, ...props }) => (
                //         <table
                //             style={{ borderCollapse: "collapse", width: "100%", margin: "10px 0px" }}
                //             {...props}
                //         />
                //     ),
                //     th: ({ node, ...props }) => (
                //         <th
                //             style={{
                //                 border: "1px solid #ddd",
                //                 padding: "8px",
                //                 backgroundColor: "#f3f4f6",
                //                 textAlign: "left",
                //             }}
                //             {...props}
                //         />
                //     ),
                //     td: ({ node, ...props }) => (
                //         <td
                //             style={{ border: "1px solid #ddd", padding: "8px" }}
                //             {...props}
                //         />
                //     ),
                //     img: ({ node, ...props }) => (
                //         <img
                //             {...props}
                //             style={{
                //                 width: 'auto',
                //                 height: 'auto',
                //                 objectFit: 'cover',
                //                 borderRadius: '10px',
                //                 margin: '20px auto',
                //                 display: 'block',
                //             }}
                //         />
                //     )
                // }}
            >
                {markdownContent}
            </ReactMarkdown>
        </div>
    );
}
