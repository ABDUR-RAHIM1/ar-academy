import React from 'react'
import AddStudent from './AddStudent'

export default function ManageStudent() {
    return (
        <div className=' bg-white rounded-md p-5'>
            <AddStudent />

            <div className=' my-10'>
                StudentList
            </div>
        </div>
    )
}
