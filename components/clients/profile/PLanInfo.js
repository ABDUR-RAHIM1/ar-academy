import React from 'react'
import { FiBookOpen } from 'react-icons/fi'

export default function PLanInfo() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
            <FiBookOpen className="text-3xl text-blue-500" />
            <div>
                <p className="text-xl font-bold">{"Basic Plan"}</p>
                <p className="text-gray-600 text-sm">Courses Bought</p>
            </div>
        </div>
    )
}
