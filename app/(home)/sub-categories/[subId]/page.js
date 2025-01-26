import React from 'react'

export default async function SubCategories({ params }) {
    const { subId } = await params;
    return (
        <div className='px-2 md:px-5 w-full h-screen flex flex-col items-center justify-center'>
            <p>  SubCategories : {subId}</p>
            <h2>Under Proccesing....</h2>
        </div>
    )
}
