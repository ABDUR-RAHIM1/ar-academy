import AddCourseForm from '@/components/dashboard/AddCourseForm'
import { courseCreateByAdmin, courseUpdateByAdmin } from '@/constans'
import React from 'react'

//  for super Admin
export default function AddCourse() {


    return (
        <div>
            <AddCourseForm
                addBy={"superAdmin"}
                addApi={courseCreateByAdmin}
                updateApi={courseUpdateByAdmin}
            />
        </div>
    )
}
