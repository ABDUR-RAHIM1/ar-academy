"use client"
import React from 'react'

export default function DeletePlanButton({ planId }) {

    const handleDeletePlan = () => {
        const isConfirm = window.confirm("আপনি কি প্লান টি ডিলিট করতে চান?")
    //     planId diye plan ti khuje nibe
    // sei shathe plan tir userId diye user ke khuje nibe o tar plan filed ti undefined kore dibe
        if (isConfirm) {
            console.log(planId)

        }

    }

    return (
        <button onClick={handleDeletePlan} className=' rounded-md py-3 px-4 bg-red-700 text-white font-medium hover:bg-red-800 transition-all'>
            আপনার প্লান ডিলিট করুন
        </button>
    )
}
