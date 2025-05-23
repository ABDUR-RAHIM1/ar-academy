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
import { getCategories } from "@/app/apiActions/categories";
import * as XLSX from 'xlsx';
import { ChapterIntroduction } from "@/utils/ChapterIntroduction";

const ChapterAdd = () => {
    const { showToast } = useContext(contextD)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [categoriId, setCategoriId] = useState("");
    const [formData, setFormData] = useState({
        position: "",
        chapter_name: "",
        contents: "",
        sub_categorie_id: "",
        fileType: "editor"
    });


    const [categories, setCategories] = useState([])
    const [sub_Categorie, set_SubCategorie] = useState([])
    const [Quill, setQuill] = useState(null);

    const defaultSelectCategoriePlaceHolder = !categories.some(() => true) ? "loading...  " : ` ক্যাটাগরি সমূহ (${categories?.length})`
    const defaultSelectPlaceHolder = !sub_Categorie.some(() => true) ? "কোন ক্যাটাগরি পাওয়া যায়নি " : ` সাব ক্যাটাগরি সমূহ (${sub_Categorie?.length})`;

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


    //  onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    };



    // categories Change handler
    const handleCategorieChange = (categorie) => {
        // caterorie - recived categorieId when select change cateories
        setCategoriId(categorie)
    };


    // sub categories Change handler
    const handleSubCategorieChange = (subCategorie) => {

        setFormData((prev) => ({
            ...prev,
            sub_categorie_id: subCategorie._id,
            type: subCategorie?.type
        }))
    };


    // get all Sub Categories and set Select Field
    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getSubCategorie();
            if (status === 200) {
                const filteredSubCategories = data.filter(subC => subC.categorieId === categoriId)
                set_SubCategorie(filteredSubCategories)
            }

        };

        getCategorieData();
    }, [categoriId]);


    // Categories get
    useEffect(() => {
        const getCategoriesData = async () => {
            const { status, data } = await getCategories();
            if (status === 200) {
                setCategories(data)
            }
        };

        getCategoriesData()
    }, [])



    // Convert exel sheet to JSON 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                // Assuming the data is in the first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert the sheet data to JSON
                const questionsJson = XLSX.utils.sheet_to_json(worksheet);
                const cleanedData = questionsJson.map(({ __rowNum__, ...rest }) => rest);

                setFormData((prev) => ({
                    ...prev,
                    contents: cleanedData
                }));
                setMessage("প্রশ্ন প্রস্তুত হয়েছে")
            };

            reader.readAsBinaryString(file);
        }
    };

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
                <div className=" flex items-center justify-between flex-wrap">
                    <h2 className=" my-5">Add Chapters</h2>
                    {/*  modal */}
                    <ChapterIntroduction fileType={formData.fileType} />
                </div>

                {/*  Categories Select */}
                <div className=" my-4">
                    <Label >
                        Select a Categorie
                    </Label>
                    <Select name='categorieId'
                        onValueChange={handleCategorieChange}

                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={defaultSelectCategoriePlaceHolder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>
                                    ক্যাটাগরি সমূহ
                                </SelectLabel>
                                {
                                    categories && categories.length > 0 ?
                                        categories.map((CItem, index) => (
                                            <SelectItem key={index} value={CItem._id}>
                                                {CItem.categorie}
                                            </SelectItem>
                                        ))
                                        : null
                                }

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


                {/*  select sub Categories */}
                <Label >
                    Select a Sub Categorie
                </Label>
                <Select name='subCategorieId'
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
                    name={"position"}
                    placeholder={"Position"}
                    value={formData.position}
                    handler={handleChange}
                />
                <InputField
                    name={"chapter_name"}
                    placeholder={"chapter Name"}
                    value={formData.chapter_name}
                    handler={handleChange}
                />

                <div className=" my-4">
                    <Label >ধরণ</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, fileType: value }))}>
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
                formData.fileType === "file" ?
                    <>
                        <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full my-3' />
                        <small className={"text-blue-500 my-2"}>
                            {message}
                        </small>
                    </>
                    :
                    <div id="editor-container" style={{ height: "500px", marginBottom: "10px" }}></div>

            }

            <div onClick={handleSubmitChapter} className=" my-4">
                <SubmitButton loadingState={loading} btnText={"Add Chapter"} />
            </div>

        </div >
    );
};

export default ChapterAdd;
