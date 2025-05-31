"use client";

import { useContext, useEffect, useRef, useState } from "react";
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
import SubmitButton from "@/utils/SubmitButton";
import { contextD } from "@/contextApi/DashboardState";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/app/apiActions/categories";
import * as XLSX from 'xlsx';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getChapterWithContent } from "@/app/apiActions/chapters";
import { chaptersUpdate } from "@/constans";

const EditChapters = () => {
  const [showContent, setShowContents] = useState(false);
  const [editDataLoading, setEditDataLoading] = useState(false)
  const textDivRef = useRef(null);
  const { showToast, editData } = useContext(contextD)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [categoriId, setCategoriId] = useState("");
  const [formData, setFormData] = useState({
    position: "",
    chapter_name: "",
    contents: "",
    sub_categorie_id: "",
    type: "",
    fileType: "editor"
  });


  const [categories, setCategories] = useState([])
  const [sub_Categorie, set_SubCategorie] = useState([])
  const [Quill, setQuill] = useState(null);
  const isEdit = editData && Object.keys(editData).length > 0;
  const defaultSelectCategoriePlaceHolder = !categories.some(() => true) ? "loading...  " : ` ক্যাটাগরি সমূহ (${categories?.length})`
  const defaultSelectPlaceHolder = !sub_Categorie.some(() => true) ? "কোন ক্যাটাগরি পাওয়া যায়নি " : ` সাব ক্যাটাগরি সমূহ (${sub_Categorie?.length})`;


  // set Edit Data 
  useEffect(() => {
    const getData = async () => {
      setEditDataLoading(true);
      try {
        if (isEdit) {
          const { status, data } = await getChapterWithContent(editData.identifier);
          if (status === 200) {
            const { solutionTable, ...others } = data
            setFormData(others);
          }
        }
      } catch (error) {
        console.log("failed to fetch Chapter Data");
      } finally {
        setEditDataLoading(false);
      }
    };

    getData();

  }, [isEdit]);


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
        if (formData.sub_categorie_id && categoriId) {

        }
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

  const handleUpdateChapter = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const payload = {
        method: "PUT",
        api: chaptersUpdate + formData._id,
        body: formData
      }
      const { status, data } = await postActions(payload);
      showToast(status, data) 

    } catch (error) {
      // showToast(500, "Failed To Update Chapter")
    } finally {
      setLoading(false)
    }
  };


  //  Content Text Copy using Button (handler)
  const handleCopyContent = () => {
    if (textDivRef.current) {
      const textContent = textDivRef.current.innerText || textDivRef.current.textContent;
      navigator.clipboard.writeText(textContent)
        .then(() => {
          showToast(200, "Contents copied successfully!");
        })
        .catch(() => {
          showToast(500, "Failed to copy Contents.");
        });
    }
  };

  return (
    <div className=" w-[95%] md:w-[80%] m-auto my-10 bg-gray-100 p-4 rounded-md">
      <div>

        <div className=" flex items-center gap-3">
          <h2 className=" my-5">Edit Chapter</h2>
          <small>
            {editDataLoading && "Please Wait..."}
          </small>
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
          <Select value={formData.fileType} onValueChange={(value) => setFormData(prev => ({ ...prev, fileType: value }))}>
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

      {/*  extra activites for copyes Chapter Contens */}
      {
        formData.fileType === "editor" &&
        <div className={` ${isEdit ? "flex" : "hidden"} my-3 w-full items-center justify-end`}>
          <button onClick={() => setShowContents(!showContent)} className="p-2 border border-double border-blue-950 rounded-md shadow-md text-sm hover:shadow-xl transition-all flex items-center gap-2">
            {
              showContent ? "hide Contents" : "Show Contents"
            }
            <span className=" text-2xl">
              {showContent ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </button>
        </div>
      }

      <div div className={` ${showContent ? "block" : "hidden"} relative my-4 w-full max-h-[300px] border border-gray-400 rounded-md p-2 overflow-y-auto`}>
        <div className=" w-full text-right mb-3 sticky top-0">
          <button onClick={handleCopyContent} className="p-2 rounded-md bg-gray-300">Copy</button>
        </div>
        {
          isEdit && <div ref={textDivRef} dangerouslySetInnerHTML={{ __html: formData.contents }} />
        }
      </div>

      <div onClick={handleUpdateChapter} className=" my-4">
        <SubmitButton loadingState={loading} btnText={"Update Chapter"} />
      </div>

    </div >
  );
};

export default EditChapters;
