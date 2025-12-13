import React from 'react'

export default function PageBanner({ text }) {
    return (
        <div className=' w-full h-[100vh] py-10 shadow-lg drop-shadow-lg text-center overflow-hidden'>
            <h2 className="inline-block relative text-[22px] md:text-3xl font-semibold color1">
                <span className="relative inline-block after:content-[''] after:absolute after:right-0 after:bottom-[-8px] after:h-[4px] after:w-[70%] after:bg-gradient-to-r after:from-[#0891b2] after:to-[#1e40af] after:rounded-full after:transition-all after:duration-500">
                    {text || "Missing headline"}
                    <span className="absolute bottom-[-10px] left-[25%] w-[10px] h-[10px] bg-[#1e40af] rounded-full shadow-md"></span>
                </span>
            </h2>
        </div>
    )
}
