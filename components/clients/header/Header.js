import React from 'react'
import { Input } from '../../ui/input'
import Nav from './Nav'

export default function Header() {
    return (
        <div className=''>
            <div className=' px-4 py-5 primaryBg flex items-center justify-between flex-wrap'>
                <h2 className=' italic'>AR-ACADEMY</h2>
                <div>
                    <Input type="search" placeholder="Quick Search" />
                </div>
            </div>

            {/*  subject List Fetch from database */}
            <Nav />

        </div>
    )
}
