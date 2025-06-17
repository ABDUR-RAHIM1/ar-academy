"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Heading from "../../globals/Heading";
import Image from "next/image";
import { COMMON_ALT_TEXT } from "@/constans";

// শিক্ষার্থীদের রিভিউ ডাটা
const reviews = [
    {
        id: 1,
        name: "রাকিব হোসেন",
        image: "https://i.pravatar.cc/100?img=1",
        review: "এই প্ল্যাটফর্মের কোর্সগুলো খুবই সহজবোধ্য এবং প্র্যাকটিকাল!",
    },
    {
        id: 2,
        name: "সাদিয়া আক্তার",
        image: "https://i.pravatar.cc/100?img=2",
        review: "আমি প্রথমে ভয় পাচ্ছিলাম, কিন্তু এখন আত্মবিশ্বাসী হয়ে উঠেছি। ধন্যবাদ!",
    },
    {
        id: 3,
        name: "তারিক রহমান",
        image: "https://i.pravatar.cc/100?img=8",
        review: "লাইভ সাপোর্ট আর কুইজগুলো আমাকে অনেক হেল্প করেছে শিখতে।",
    },
    {
        id: 4,
        name: "নুসরাত জাহান",
        image: "https://i.pravatar.cc/100?img=4",
        review: "আমার ক্যারিয়ার শুরু করার জন্য এটা ছিল পারফেক্ট জায়গা।",
    },
    {
        id: 5,
        name: "তানভীর আহমেদ",
        image: "https://i.pravatar.cc/100?img=5",
        review: "প্রতি ধাপে গাইডলাইন আর ফিডব্যাক খুব ভালো লেগেছে।",
    },
];

export default function Reviews() {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="w-full py-12 bg-gray-50">
            <Heading text="👩‍🎓 শিক্ষার্থীদের রিভিউ" />

            <Carousel
                setApi={setApi}
                className="w-full max-w-6xl mx-auto mt-8"
                opts={{ loop: true }}
            >
                <CarouselContent className="py-4">
                    {reviews.map((person, index) => (
                        <CarouselItem
                            key={person.id}
                            className={cn("px-4 sm:basis-1/2 md:basis-1/3")}
                        >
                            <Card
                                className={cn(
                                    "transition-transform duration-500 border border-gray-200 shadow-sm hover:shadow-md bg-white h-full"
                                )}
                            >
                                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={person.image}
                                        alt={COMMON_ALT_TEXT}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-4"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{person.name}</h3>
                                    <p className="text-sm text-gray-600 italic">"{person.review}"</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-4">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    );
}
