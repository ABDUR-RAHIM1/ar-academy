"use client";

import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";

const QuillEditor = () => {
    const [editorContent, setEditorContent] = useState("");
    const [Quill, setQuill] = useState(null);

    useEffect(() => {
        // Dynamically import Quill
        (async () => {
            const { default: QuillModule } = await import("quill");
            setQuill(() => QuillModule);
        })();
    }, []);

    useEffect(() => {
        if (Quill) {
            // Initialize Quill editor
            const editor = new Quill("#editor-container", {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["bold", "italic", "underline"],
                        [{ align: [] }],
                        ["link"],
                        ["blockquote", "code-block"],
                        [{ color: [] }, { background: [] }],
                        ["image", "video"],
                    ],
                },
            });

            // Listen for text changes and update state
            editor.on("text-change", () => {
                setEditorContent(editor.root.innerHTML);
            });
        }
    }, [Quill]);

    return (
        <div>
            {/* Editor container */}
            <div id="editor-container" style={{ height: "200px" }}></div>

            {/* Display content */}
            <p>{editorContent}</p>
        </div>
    );
};

export default QuillEditor;
