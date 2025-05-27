"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

export default function AdminProfileEditButton() {
    return (
        <Button variant="outline" size="sm" onClick={() => console.log("Edit profile clicked")}>
            ✏️ Edit Account
        </Button>
    )
}
