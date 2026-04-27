"use client"
import { useParams } from 'next/navigation'

export default function ChaptersDetailsClient() {

    const params = useParams();
    const subIdentifier = decodeURIComponent(params.subIdentifier);


    return (
        <div>
            {/* যদি subIdentifier থাকে এবং chapter না থাকে, শুধু default cover hisebe দেখাবে */}
            {subIdentifier && (
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="bg-white border-l-8 border-blue-500 shadow-xl rounded-lg px-5 md:px-12 py-10 md:py-16 max-w-lg text-center">
                        <h1 className="text-5xl font-bold text-blue-700 mb-4 leading-tight tracking-wide">
                            {subIdentifier}
                        </h1>
                        <p className="text-lg text-gray-500 italic">
                            বিষয়ে আপনার জ্ঞান বাড়াতে সহায়ক একটি রিসোর্স।
                        </p>
                    </div>
                </div>
            )}

        </div>
    )
}
