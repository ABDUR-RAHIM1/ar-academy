"use client"
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

function JoditRichTextEditor() {
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const config = {
        readonly: false,
        height: 400,
        toolbarSticky: true,
        placeholder: "Start typing here...",
    };

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };
console.log(content)
    return (
        <div style={{ margin: "20px" }}>
            <h2>Jodit Rich Text Editor</h2>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => handleEditorChange(newContent)}
            />
            <h3>Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default JoditRichTextEditor;
