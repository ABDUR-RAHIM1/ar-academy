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
import { getChapterWithContent, getSubCategorie } from "@/app/apiActions/client/clientApi";
import { postActions } from "@/actions/admins/postActions";
import { chapters } from "@/constans";
import SubmitButton from "@/utils/SubmitButton";
import { contextD } from "@/contextApi/DashboardState";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const EditChapters = () => {
  const { showToast, editData } = useContext(contextD)
  const [editDataLoading, setEditDataLoading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContents] = useState(false);
  const textDivRef = useRef(null);

  const [formData, setFormData] = useState({
    chapter_name: "",
    identifier: "",
    contents: "",
    sub_categorie_id: ""
  });
  const [searchValue, setSearchValue] = useState("")

  const [sub_Categorie, set_SubCategorie] = useState([])
  const [Quill, setQuill] = useState(null);

  const isEdit = editData && Object.keys(editData).length > 0;
  const defaultSelectPlaceHolder = !sub_Categorie.some(() => true) ? "কোন ক্যাটাগরি পাওয়া যায়নি " : `সাব ক্যাটাগরি সমূহ (${sub_Categorie?.length})`

  // set Edit Data 
  useEffect(() => {
    const getData = async () => {
      setEditDataLoading(true);
      try {
        if (isEdit) {
          const { status, data } = await getChapterWithContent(editData.identifier);
          if (status === 200) {
            setFormData(data);
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

  // Initialize Quill editor
  useEffect(() => {
    if (Quill) {

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
  }, [Quill, isEdit]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

  };

  const handleCategorieChange = (categorieId) => {
    setFormData((prev) => ({
      ...prev,
      sub_categorie_id: categorieId
    }))
  };

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

  //  seacrh Filter Categories 
  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleUpdateChapter = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const payload = {
        method: "PUT",
        api: chapters + formData._id,
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
        <h2 className=" my-5">Edit Chapters  </h2>
        <p className=" text-sm text-red-700">{editDataLoading ? "Data Laoding . . ." : ""}</p>

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
                Sub Categorie
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
          required={false}
        />
        <InputField
          name={"identifier"}
          placeholder={"Unique"}
          value={formData.identifier}
          handler={handleChange}
          required={false}
        />

      </div>
      {/* Editor container */}
      <div id="editor-container" style={{ height: "300px", marginBottom: "10px" }}>  </div>


      {/*  extra activites for copyes Chapter Contens */}
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

      <div className={` ${showContent ? "block" : "hidden"} relative my-4 w-full max-h-[300px] border border-gray-400 rounded-md p-2 overflow-y-auto`}>
        <div className=" w-full text-right mb-3 sticky top-0">
          <button onClick={handleCopyContent} className="p-2 rounded-md bg-gray-300">Copy</button>
        </div>
        {
          isEdit && <div ref={textDivRef} dangerouslySetInnerHTML={{ __html: formData.contents }} />
        }
      </div>

      {/* className={`${isEdit ? "block" : "hidden"}`} */}
      <div onClick={handleUpdateChapter}>
        <SubmitButton loadingState={loading} btnText={"Update Chapter"} />
      </div>

    </div >
  );
};

export default EditChapters;
