"use client";

import { useContext, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { InputField } from "@/utils/InputFIled";


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getSubCategorie } from "@/app/apiActions/client/clientApi";
import { postActions } from "@/actions/admins/postActions";
import { chaptersCreate } from "@/constans";
import SubmitButton from "@/utils/SubmitButton";
import { contextD } from "@/contextApi/DashboardState";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ChapterAdd = () => {
    const { showToast } = useContext(contextD)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(true) // editor
    const [formData, setFormData] = useState({
        chapter_name: "",
        contents: "",
        sub_categorie_id: "",
        type: ""
    });

    const [searchValue, setSearchValue] = useState("")

    const [sub_Categorie, set_SubCategorie] = useState([])
    const [Quill, setQuill] = useState(null);

    const defaultSelectPlaceHolder = !sub_Categorie.some(() => true) ? "কোন ক্যাটাগরি পাওয়া যায়নি " : ` সাব ক্যাটাগরি সমূহ (${sub_Categorie?.length})`

    // Dynamically import Quill
    useEffect(() => {

        (async () => {
            const { default: QuillModule } = await import("quill");
            setQuill(() => QuillModule);
        })();
    }, []);


    //  Set Text Editor
    useEffect(() => {
        if (Quill && type) {
            // Initialize Quill editor
            const editor = new Quill("#editor-container", {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading levels
                        [{ font: [] }], // Font selection
                        [{ size: ["small", false, "large", "huge"] }], // Font size
                        [{ list: "ordered" }, { list: "bullet" }], // Ordered & Unordered lists
                        [{ script: "sub" }, { script: "super" }], // Subscript & Superscript
                        [{ indent: "-1" }, { indent: "+1" }], // Indentation
                        [{ direction: "rtl" }], // Right-to-Left text support
                        [{ align: [] }], // Text align (left, center, right, justify)
                        ["bold", "italic", "underline", "strike"], // Text formatting
                        [{ color: [] }, { background: [] }], // Text & Background color
                        ["blockquote", "code-block"], // Blockquote & Code block
                        ["link", "image", "video", "formula"], // Media (link, image, video, formula)
                        ["clean"], // Remove formatting
                    ],
                },
            });

            // Listen for text changes and update state
            editor.on("text-change", () => {
                setFormData((prev) => ({
                    ...prev,
                    contents: editor.root.innerHTML
                }))
            });
        }
    }, [Quill]);

    //  handle type change
    const handleTypeChange = (type) => {
        if (type === "editor") {
            setType(true)
        } else {
            setType(false)
        }
    }

    //  onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    };

    // categories Change handler
    const handleSubCategorieChange = (categorie) => {

        setFormData((prev) => ({
            ...prev,
            sub_categorie_id: categorie._id,
            type: categorie?.type
        }))
    };


    //  seacrh Filter Categories 
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    // get all Sub Categories and set Select Field
    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getSubCategorie();
            if (status === 200) {
                // If searchValue is present, filter data based on sub_name or identifier
                const filteredData = searchValue
                    ? data.filter((item) =>
                    (item.sub_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                        item.identifier.toLowerCase().includes(searchValue.toLowerCase()))
                    )
                    : data;

                set_SubCategorie(filteredData);
            }
        };

        getCategorieData();
    }, [searchValue]);



    //  submit Chapter
    const handleSubmitChapter = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const payload = {
                method: "POST",
                api: chaptersCreate,
                body: formData
            }
            const { status, data } = await postActions(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error?.message)
            showToast(500, "Failed To Post Chapter")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className=" w-[95%] md:w-[80%] m-auto my-10 bg-gray-100 p-4 rounded-md">
            <div>
                <h2 className=" my-5">Add Chapters</h2>

                <InputField
                    label={"Search a Categories"}
                    name={"Search a Categories"}
                    placeholder={"Quick Search"}
                    value={searchValue}
                    handler={handleSearch}
                />

                <Select name='categorieId'
                    onValueChange={handleSubCategorieChange}

                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={defaultSelectPlaceHolder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                সাব ক্যাটাগরি সমূহ
                            </SelectLabel>
                            {
                                sub_Categorie && sub_Categorie.length > 0 ?
                                    sub_Categorie.map((CItem, index) => (
                                        <SelectItem key={index} value={CItem}>
                                            {CItem.sub_name}
                                        </SelectItem>
                                    ))
                                    : null
                            }

                        </SelectGroup>
                    </SelectContent>
                </Select>


                <InputField
                    name={"chapter_name"}
                    placeholder={"chapter Name"}
                    value={formData.chapter_name}
                    handler={handleChange}
                />

                <div className=" my-4">
                    <Label >ধরণ</Label>
                    <Select onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="একটি ধরণ নির্বাচন করুন" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="editor">এডিটর</SelectItem>
                                <SelectItem value="file">ফাইল</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            {/* Editor container */}

            {
                type ?
                    <div id="editor-container" style={{ height: "500px", marginBottom: "10px" }}></div>
                    :
                    <Input type={"file"} name={"file"} className={"my-4"} />

            }

            <div onClick={handleSubmitChapter}>
                <SubmitButton loadingState={loading} btnText={"Add Chapter"} />
            </div>

        </div >
    );
};

export default ChapterAdd;
