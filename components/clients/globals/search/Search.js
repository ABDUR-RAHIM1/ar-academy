"use client"
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getSearchCategories, getSearchChapters, getSearchSubCategories } from './getSearchData'
import SearchOutput from './SearchOutput'
import { contextD } from '@/contextApi/DashboardState'
import { MdClose } from 'react-icons/md'

export default function Search() {
    const { showSearchBar, setShowSearchBar } = useContext(contextD)
    const [selectValue, setSelectValue] = useState("")
    const [selectData, setSelectData] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchData, setSearchData] = useState([])

    const handleSelectChange = (select) => {
        setSelectValue(select)
    }


    const handleSearchChange = (e) => {
        const seacrhText = (e.target.value).toLowerCase();
        setSearchValue(seacrhText)
    }


    /// extact selected Data
    useEffect(() => {
        const getData = async () => {
            try {
                let data = [];

                if (selectValue === "categories") {
                    const allCategories = await getSearchCategories();
                    data = allCategories.data.map(item => ({
                        _id: item._id,
                        name: item.categorie
                    }));
                } else if (selectValue === "subCategories") {
                    const allSubCategories = await getSearchSubCategories();
                    data = allSubCategories.data.map(item => ({
                        _id: item._id,
                        name: item.sub_name
                    }));
                } else if (selectValue === "chapters") {
                    const allChapters = await getSearchChapters();
                    data = allChapters.data.map(item => ({
                        _id: item._id,
                        name: item.chapter_name
                    }));
                }

                setSelectData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (selectValue) {
            getData();
        }
    }, [selectValue]);


    // **searchValue অনুযায়ী ফিল্টার করা**
    useEffect(() => {

        if (searchValue) {
            const filtered = selectData.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) // Case insensitive search
            );
            setSearchData(filtered);
        } else {
            setSearchData([]); // যদি সার্চ ইনপুট খালি থাকে, empty dekhabe
        }
    }, [searchValue]);



    return (
        <div className={
            ` ${showSearchBar ? "scale-1" : "scale-0"} transition-all duration-500 px-3 w-full h-screen bg-blue-900 bg-opacity-90 flex items-center justify-center fixed top-0 left-0`
        }>

            <MdClose onClick={() => setShowSearchBar(false)} className=' fixed top-10 right-10 text-4xl text-red-600 border border-red-400 p-1 rounded-md cursor-pointer ' />

            <div className='w-full md:w-[50%] m-auto '>
                {
                    !selectValue && <p className='text-white'>আগে বিষয় নির্বাচন!</p>
                }
                <div className='flex items-center justify-center  bg-white '>
                    <Input disabled={!selectValue} onChange={handleSearchChange} type="search" placeholder="Quick Search" className={"py-5"} />
                    <Select
                        name='seacrh'
                        onValueChange={handleSelectChange}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* ক্যাটাগরি / বিষয় / অধ্যায় */}
                            <SelectGroup>
                                <SelectLabel>
                                    বিষয় সমূহ
                                </SelectLabel>
                                <SelectItem value="categories">ক্যাটাগরি</SelectItem>
                                <SelectItem value="subCategories">বিষয়</SelectItem>
                                <SelectItem value="chapters">অধ্যায়</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>


                {
                    searchValue &&
                    <SearchOutput
                        seacrhText={searchValue}
                        searchData={searchData}
                    />
                }

            </div>
        </div>
    )
}
