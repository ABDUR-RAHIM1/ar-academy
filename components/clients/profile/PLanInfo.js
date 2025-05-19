import React from 'react'
import { FiFileText } from 'react-icons/fi'

export default function PLanInfo() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
            <FiFileText className="text-3xl text-green-500" />
            <div>
                <p className="text-xl font-bold">{1}</p>
                <p className="text-gray-600 text-sm">Course</p>
            </div>
        </div>
    )
}
