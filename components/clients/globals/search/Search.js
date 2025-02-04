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
        const searchText = e.target.value.toLowerCase();
        setSearchValue(searchText)
    }

    // Extract selected Data
    useEffect(() => {
        const getData = async () => {
            try {
                let data = [];
                if (selectValue === "categories") {
                    const allCategories = await getSearchCategories();
                    data = allCategories.data.map(item => ({
                        _id: item._id,
                        name: item.categorie,
                        path: "/"
                    }));
                } else if (selectValue === "subCategories") {
                    const allSubCategories = await getSearchSubCategories();
                    data = allSubCategories.data.map(item => ({
                        _id: item._id,
                        name: item.sub_name,
                        path: `/sub-categories/${item.identifier}`
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

    // Filter based on searchValue
    useEffect(() => {
        if (searchValue) {
            const filtered = selectData.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setSearchData(filtered);
        } else {
            setSearchData([]);
        }
    }, [searchValue]);

    return (
        <div className={`px-2 py-10 fixed top-0 left-0 w-full h-screen bg-blue-900 bg-opacity-90  z-50 transition-all duration-500 ${showSearchBar ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
            <MdClose
                onClick={() => setShowSearchBar(false)}
                className='fixed top-10 right-10 text-4xl text-red-600 border border-red-400 p-1 rounded-md cursor-pointer transition-transform transform hover:rotate-90 duration-300'
            />
            <div className='w-full md:w-[50%] m-auto bg-white p-6 rounded-lg shadow-lg transition-all duration-500'>
                {!selectValue && <p className='text-gray-600 text-center'>আগে বিষয় নির্বাচন করুন!</p>}
                <div className='flex items-center bg-gray-100 p-2 rounded-lg shadow-sm'>
                    <Input
                        disabled={!selectValue}
                        onChange={handleSearchChange}
                        type="search"
                        placeholder="Quick Search"
                    />
                    <Select name='search' onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-[180px] border-none bg-white px-4 py-3 rounded-r-lg shadow-sm cursor-pointer mx-2">
                            <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg rounded-lg">
                            <SelectGroup>
                                <SelectLabel className="text-gray-700 font-bold px-4 py-2">বিষয় সমূহ</SelectLabel>
                                <SelectItem value="categories" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">ক্যাটাগরি</SelectItem>
                                <SelectItem value="subCategories" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">বিষয়</SelectItem>
                                <SelectItem value="chapters" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">অধ্যায়</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {searchValue &&
                    <SearchOutput searchText={searchValue} searchData={searchData} />
                }
            </div>
        </div>
    )
}