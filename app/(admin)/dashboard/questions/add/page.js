"use client"
import React, { useState } from 'react'

export default function AddQuestion() {
    const [formData, setFormData] = useState({
        subjectName: "",
        subjectId: "",
        questions: []
    })
    return (
        <div>AddQuestion</div>
    )
}
