import React from 'react'
import { FiBarChart2 } from 'react-icons/fi'

export default function AvarageResult() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
            <FiBarChart2 className="text-3xl text-purple-500" />
            <div>
                <p className="text-xl font-bold">{85}%</p>
                <p className="text-gray-600 text-sm">Average Result</p>
            </div>
        </div>
    )
}
