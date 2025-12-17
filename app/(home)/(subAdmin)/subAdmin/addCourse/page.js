import AddCourseForm from '@/components/dashboard/AddCourseForm'
import { courseCreateBySubAdmin, courseUpdateByAdmin } from '@/constans'
import React from 'react'


//  sub Admin Add his Course
export default function AddCourse() {
    return (
        <div>
            <AddCourseForm
                addBy={"subAdmin"}
                addApi={courseCreateBySubAdmin}
                updateApi={courseUpdateByAdmin} // ata sub admin er update api diye change korte hobe. 
            />
        </div>
    )
}
