"use client"
import DeleteUserActionButton from '@/actions/Buttons/DeleteUserActionButton'
import { purchaseMyPlanDelete } from '@/constans'
import React from 'react'

export default function DeletePlanButton({ planId }) {

    return (
        <DeleteUserActionButton btnText={" আপনার প্লান ডিলিট করুন"} deleteRoute={purchaseMyPlanDelete + planId} width={"200px"} />
    )
}
