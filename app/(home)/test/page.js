"use client"
import React, { useState } from 'react'

export default function QuestionBuilder() {
  const [groupName, setGroupName] = useState("mcq");

  const [groups, setGroups] = useState([]);




  return (
    <div className=' p-5'>
      <div className='w-[450px] m-auto flex items-center flex-col gap-3'>
        <select onChange={(e) => setGroupName(e.target.value)} name="groupName" id="groupName">
          <option value="mcq">Mcq</option>
          <option value="cq">Cq</option>
        </select>

        <input className='broder border-zinc-100 outline-double' type="text" name='question' placeholder='Mcq Question' />
        {
          groupName === "mcq" &&
          <input className='broder border-zinc-100 outline-double' type="text" name='options' placeholder='Mcq Options' />
        }
      </div>

    </div>
  )
}
