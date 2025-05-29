'use client'

import { useSearchParams } from "next/navigation"

export default function SearchPage(){
    const searchParams = useSearchParams();
    const query = searchParams.get('q')
    return(
    <>
        <div className="container mt-1">
            <h1>You searched for: {query}</h1>
        </div>
    </>
)}