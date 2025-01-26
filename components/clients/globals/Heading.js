import React from 'react'

export default function Heading({ text }) {
    return (
        <h2 className='text-center my-3 underline  text-blue-900'>
            {text || "Missing headline"}
        </h2>
    )
}
