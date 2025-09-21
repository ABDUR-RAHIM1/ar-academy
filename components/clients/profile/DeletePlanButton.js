"use client"
import DeleteUserActionButton from '@/actions/Buttons/DeleteUserActionButton'
import { purchaseMyCourseDelete } from '@/constans'
import React from 'react'

export default function DeletePlanButton({ planId }) {

    return (
        <DeleteUserActionButton btnText={" আপনার প্লান ডিলিট করুন"} deleteRoute={purchaseMyCourseDelete + planId} width={"200px"} />
    )
}
