"use client";

import { useContext, useEffect, useState } from "react";
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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChapterAdd = () => {
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [categoriId, setCategoriId] = useState("");
    const [formData, setFormData] = useState({
        position: "",
        chapter_name: "",
        contents: "",
        sub_categorie_id: "",
        type: "",
        fileType: "editor"
    });


    const [categories, setCategories] = useState([]);
    const [sub_Categorie, set_SubCategorie] = useState([]);
  const [preview, setPreview] = useState(false);

    const defaultSelectCategoriePlaceHolder = !categories.some(() => true) ? "loading...  " : ` ক্যাটাগরি সমূহ (${categories?.length})`;
    const defaultSelectPlaceHolder = !sub_Categorie.some(() => true) ? "কোন ক্যাটাগরি পাওয়া যায়নি " : ` সাব ক্যাটাগরি সমূহ (${sub_Categorie?.length})`;



    //  onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

    };



    const handleFileTypeChange = (value) => {

        // fileType পরিবর্তন হলে contents ফিল্ড ক্লিয়ার করো
        if (value === "editor") {
            console.log("editor change")
            setFormData({
                ...formData,
                fileType: value,
                contents: " লিখুন (markdown editor)", // একসাথে clear
            });

        } else {
            setFormData((prev) => ({
                ...prev,
                fileType: value
            }))
        }

    }



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



    // categories Change handler
    const handleCategorieChange = (categorie) => {
        setCategoriId(categorie);
    };



    // Categories get
    useEffect(() => {
        const getCategoriesData = async () => {
            const { status, data } = await getCategories();
            if (status === 200) {
                setCategories(data);
            }
        };
        getCategoriesData();
    }, []);



    // get all Sub Categories and set Select Field
    useEffect(() => {
        const getCategorieData = async () => {
            const { status, data } = await getSubCategorie();
            if (status === 200) {
                const filteredSubCategories = data.filter(subC => subC.categorieId === categoriId);
                set_SubCategorie(filteredSubCategories);
            }
        };
        getCategorieData();
    }, [categoriId]);



    // sub categories Change handler
    const handleSubCategorieChange = (subCategorie) => {
        setFormData((prev) => ({
            ...prev,
            sub_categorie_id: subCategorie._id,
            type: subCategorie?.type
        }));
    };



    // submit Chapter
    const handleSubmitChapter = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                method: "POST",
                api: chaptersCreate,
                body: formData
            };
            const { status, data } = await postActions(payload);
            showToast(status, data);
        } catch (error) {
            console.log(error?.message);
            showToast(500, "Failed To Post Chapter");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[95%] md:w-[80%] m-auto my-10 bg-gray-100 p-4 rounded-md">
            <div>
                <div className="flex items-center justify-between flex-wrap">
                    <h2 className="my-5">Add Chapters</h2>
                </div>

                {/* Categories Select */}
                <div className="my-4">
                    <Label>
                        Select a Categorie
                    </Label>
                    <Select name='categorieId' onValueChange={handleCategorieChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={defaultSelectCategoriePlaceHolder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>ক্যাটাগরি সমূহ</SelectLabel>
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

                {/* select sub Categories */}
                <Label>
                    Select a Sub Categorie
                </Label>
                <Select name='subCategorieId' onValueChange={handleSubCategorieChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={defaultSelectPlaceHolder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>সাব ক্যাটাগরি সমূহ</SelectLabel>
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
                    placeholder={"Chapter Name"}
                    value={formData.chapter_name}
                    handler={handleChange}
                />

                <div className="my-4">
                    <Label>ধরণ</Label>
                    <Select onValueChange={handleFileTypeChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="একটি ধরণ নির্বাচন করুন" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="editor">এডিটর</SelectItem>
                                <SelectItem value="file">ফাইল</SelectItem>
                                <SelectItem value="written">লিখিত</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Markdown Editor */}
            {
                formData.fileType !== "editor" ?
                    <>
                        <Input onChange={handleFileChange} type="file" accept=".xlsx, .xls" className=' w-full my-3' />
                        <small className={"text-blue-500 my-2"}>
                            {message}
                        </small>
                    </>
                    :
                    <Textarea
                        name="contents"
                        id="contents"
                        className="p-4 w-full h-[350px] my-5 border border-gray-300 rounded resize-none"
                        placeholder="Markdown লিখুন এখানে..."
                        value={formData.contents}
                        onChange={handleChange}
                    />

            }


            {/* Markdown Preview */}
            {
                formData.fileType === "editor" && typeof formData.contents === "string" &&

                <>
                    {
                        formData.contents !== "" &&
                        <div className=" w-full py-5 bg-gray-50 color1 font-medium text-center">
                            <Button onClick={() => setPreview(!preview)} variant={"outline"} className="">
                                {
                                    preview ? "প্রিভিউ বন্ধ ⛔" : "প্রিভিউ দেখুন 👁️"
                                }
                            </Button>
                        </div>
                    }
                    <div className={` ${preview ? "block" : "hidden"} transition-all markdown prose p-4 border border-gray-200 rounded bg-white shadow-sm mb-6 max-h-[350px] overflow-y-auto overflow-x-hidden`}>

                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex, rehypeRaw]}

                        >
                            {formData.contents}
                        </ReactMarkdown>
                    </div>
                </>
            }
            <div onClick={handleSubmitChapter} className="my-4">
                <SubmitButton loadingState={loading} btnText={"Add Chapter"} width={"w-[100px]"} />
            </div>
        </div>
    );
};

export default ChapterAdd;
