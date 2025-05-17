"use client"
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as mammoth from 'mammoth';
import ExtractRules from './ExtractRules';

//  akhn use kora hocce na
const DocToExcelConverter = () => {
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const arrayBuffer = await file.arrayBuffer();

        const result = await mammoth.extractRawText({ arrayBuffer });
        const lines = result.value.split('\n').map(line => line.trim()).filter(line => line !== '');

        const questions = [];
        let currentQuestion = {};

        lines.forEach((line, index) => {
            if (line.startsWith('*')) {
                if (Object.keys(currentQuestion).length > 0) {
                    questions.push(currentQuestion);
                }
                currentQuestion = { ID: questions.length + 1, Questions: line.replace(/^\*\s*/, '') };
            } else if (line.startsWith('*')) {
                currentQuestion[`Option${Object.keys(currentQuestion).length}`] = line.replace(/^\*\s*/, '');
            } else if (line.startsWith('*')) {
                currentQuestion.CorrectAnswer = line.replace(/^\*\s*/, '');
            } else if (line.startsWith('~')) {
                currentQuestion.Clearence = line.replace(/^~\s*/, '');
            } else if (line.startsWith('!')) {
                currentQuestion.SubjectName = line.replace(/^!\s*/, '');
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(questions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'converted-questions.xlsx');
    };


    return (
        <div className="p-4">

            (
            <ExtractRules />

            <input type="file" accept=".docx" onChange={handleFileUpload} />
        </div>
    );
};

export default DocToExcelConverter;
