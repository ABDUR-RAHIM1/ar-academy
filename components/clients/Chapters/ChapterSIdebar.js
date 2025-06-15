"use client"
import { getChapterByIdentifier } from '@/app/apiActions/client/clientApi';
import LoadingSpinner from '@/components/spinner-01';
import { COMMON_ALT_TEXT } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { arrow } from '@/Images/Images';
import Error from '@/utils/Error';
import { SidebarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'


export default function ChapterSidebar({ subIdentifier }) {
    const searchParams = useSearchParams();
    const chapterName = searchParams.get("chapter")
    const paramsName = subIdentifier ? decodeURIComponent(subIdentifier) : "";

    const { setSubIdentifer } = useContext(contextD);
    const [arrowClick, setArrowClick] = useState(false)
    const [loading, setLoading] = useState(false)
    const [chapterItems, setChaptersItems] = useState([]);
    const [status, setStatus] = useState("200")


    //  store sub Categories Identifier in Context API
    useEffect(() => {
        if (paramsName) {
            setSubIdentifer(paramsName)
        }
    }, [chapterName])


    //  get chapter by Identfier
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const { status, data } = await getChapterByIdentifier(subIdentifier);
                if (status === 200 && data) {
                    setChaptersItems(data)
                };
                setStatus(status)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };
        getData()
    }, [])


    const handleArrowClick = () => {
        setArrowClick(!arrowClick)
    }

    const handleMobileViewMenuClick = () => {
        if (window.innerWidth < 768) {
            setArrowClick(true)
        }
    }


    if (!status || !chapterItems) {
        return <Error />
    };


    // if (loading) {
    //     return <LoadingSpinner />
    // }


    return (
        <>
            <div onClick={handleArrowClick} className={` block md:hidden  z-30 fixed top-[80px] md:top-[68px] ${arrowClick ? " left-0" : " left-[322px]"} cursor-pointer transition-all`}>


                <div className=' bg-indigo-50 p-2 ' title='সাইডবার ওপেন করো
                '>
                    <SidebarIcon className=' font-bold text-2xl color1' />
                </div>

            </div>

            <div className={
                `${arrowClick ? "scale-x-0" : "scale-x-100"} origin-left transition-all 
                     h-screen p-5 bg-indigo-50 
                    absolute md:static w-[320px]
                    top-[70px] left-0 
                    overflow-y-auto border-r-blue-500 border-2`

            }>

                {
                    (loading || !chapterItems) ?
                        <div className=' h-full flex items-center justify-center'>
                            <LoadingSpinner />
                        </div>
                        :
                        <>
                            <h2 className=' my-5 text-center'>{paramsName}</h2>

                            {
                                chapterItems && chapterItems.map((sub, index) => (
                                    <Link
                                        href={
                                            {
                                                pathname: `/chapters/${subIdentifier}`,
                                                query: { "chapter": sub.identifier }
                                            }
                                        }
                                        onClick={handleMobileViewMenuClick}
                                        key={sub._id} className={` ${chapterName === sub.identifier ? "bg1 text-white  hover:bg2" : ""} rounded-sm w-full inline-block my-1 p-2 text-[14px] transition-all duration-300 hover:color1 hover:underline`}>
                                        <div className='flex items-center gap-3' title={`Position: ${sub.position || (- index + 1)}`}>
                                            <span>{index + 1}.</span>
                                            <span className=''>{sub.chapter_name}
                                                {/* <small className='text-sm mx-2 text-red-700'>{}</small> */}
                                            </span>

                                        </div>
                                    </Link>
                                ))
                            }
                            <div style={{ height: "10px" }}></div>
                        </>
                }



            </div>
        </>
    )
}
