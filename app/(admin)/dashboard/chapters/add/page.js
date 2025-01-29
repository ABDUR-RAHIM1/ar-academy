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
import { chapters } from "@/constans";
import SubmitButton from "@/utils/SubmitButton";
import { contextD } from "@/contextApi/DashboardState";

const ChapterAdd = () => {
    const { showToast } = useContext(contextD)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        chapter_name: "",
        identifier: "",
        contents: "",
        sub_categorie_id: ""
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
                setFormData((prev) => ({
                    ...prev,
                    contents: editor.root.innerHTML
                }))
            });
        }
    }, [Quill]);


    //  onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    };

    // categories Change handler
    const handleCategorieChange = (categorieId) => {
        setFormData((prev) => ({
            ...prev,
            sub_categorie_id: categorieId
        }))
    };


    //  seacrh Filter Categories 
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    // get all chapter and set Select Field
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
                api: chapters,
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
                    onValueChange={handleCategorieChange}

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
                                        <SelectItem key={index} value={CItem._id}>
                                            {`${CItem.sub_name} (${CItem.identifier})`}
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
                <InputField
                    name={"identifier"}
                    placeholder={"Unique"}
                    value={formData.identifier}
                    handler={handleChange}
                />

            </div>
            {/* Editor container */}
            <div id="editor-container" style={{ height: "300px", marginBottom: "10px" }}></div>


            <div onClick={handleSubmitChapter}>
                <SubmitButton loadingState={loading} btnText={"Add Chapter"} />
            </div>

        </div >
    );
};

export default ChapterAdd;
