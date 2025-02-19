import React from 'react'

export default function Heading({ text }) {
    return (
        <h2 className=' text-[22px] md:text-3xl text-center my-3 border-b-2 border-b-teal-700 color1'>
            {text || "Missing headline"}
        </h2>
    )
}
