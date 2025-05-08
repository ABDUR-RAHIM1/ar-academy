
import React from 'react'

export default async function Test() {
  const res = await fetch("http://localhost:5000/api/account/protected", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    },
    credentials: "include",
  });
  const data = await res.json();

  console.log(data)


  


  return (
    <div>Test</div>
  )
}
