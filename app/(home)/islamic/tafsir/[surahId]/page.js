"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function TafsirView() {
    const searchParams = useSearchParams();
    const surahNumber = searchParams.get("surahNumber")
    const ayahNumber = searchParams.get("ayahNumber");
    const [tafsirData, setTafsirData] = useState("")

    useEffect(() => {
        if (!surahNumber || !ayahNumber) return;

        const fetchTafsir = async () => {
            try {
                const response = await fetch(`/al-quran/tafsir/${surahNumber}.json`);
                const data = await response.json();

                setTafsirData(data[String(ayahNumber)] || "এই আয়াতের জন্য কোনো তাফসির নেই");
                console.log(data[String(ayahNumber)])
            } catch (error) {
                console.error("তাফসির লোড করতে ব্যর্থ!", error);
                setTafsirData("তাফসির পাওয়া যায়নি।");
            }
        };

        fetchTafsir();
    }, [surahNumber, ayahNumber]);

    return (
        <div className=' my-10 px-5'>
            <h2 className=' text-center my-5'>📖 সূরা {surahNumber} - আয়াত {ayahNumber} এর তাফসির</h2>

            <div
                className='tafsir-content'
                dangerouslySetInnerHTML={{
                    __html: tafsirData
                        .split(' ')
                        .reduce((acc, word, index) => {
                            if (index % 105 === 0 && index !== 0) {
                                acc.push('</p><p>');  // 100 শব্দ পর <p> ট্যাগ বন্ধ এবং নতুন <p> ট্যাগ শুরু হবে
                            }
                            acc.push(word);
                            return acc;
                        }, [])
                        .join(' '), // শব্দ গুলোকে আবার একসাথে যোগ করে HTML ফরম্যাটে রেন্ডার হবে
                }}
            ></div>


        </div>
    );
}
