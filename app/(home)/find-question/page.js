import React from 'react'
import FindQuestionsClient from './FindQuestionsClient'
import { findQuestionsMetadata } from '@/seo/findQuestionsMetadata'


export const metadata = findQuestionsMetadata

//  parent page
export default function FindQestions() {
    return <FindQuestionsClient />
}
