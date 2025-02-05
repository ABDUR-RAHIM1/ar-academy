import Link from 'next/link'
import React from 'react'

export default function MoreButton({ text, path }) {
    return (
        <Link
            href={path}
            className=' inline-block btnBg'
        >
            {
                text || "আরো দেখুন "
            }
        </Link>
    )
}
