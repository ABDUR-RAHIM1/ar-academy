"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton'
import { purchaseMyPlanDelete } from '@/constans'
import React from 'react'

export default function DeletePlanButton({ planId }) {
 
    return (
        <DeleteActionButton  btnText={" আপনার প্লান ডিলিট করুন"} deleteRoute={purchaseMyPlanDelete + planId} />
    )
}
