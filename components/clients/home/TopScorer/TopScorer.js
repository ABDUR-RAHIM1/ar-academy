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

// Dummy data
const dummyImageData = [
    {
        id: 1,
        name: "Rakib Hossain",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        position: "Top Scorer",
    },
    {
        id: 2,
        name: "Sadia Akter",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
        position: "Top Performer",
    },
    {
        id: 3,
        name: "Tariq Rahman",
        image: "https://randomuser.me/api/portraits/men/31.jpg",
        position: "Best Contributor",
    },
    {
        id: 4,
        name: "Nusrat Jahan",
        image: "https://randomuser.me/api/portraits/women/41.jpg",
        position: "Top Developer",
    },
    {
        id: 5,
        name: "Tanvir Ahmed",
        image: "https://randomuser.me/api/portraits/men/51.jpg",
        position: "Top Innovator",
    },
];

export default function TopScorer() {
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
        <div className="w-full">
            <Heading text={"টপ স্কোরার"} />
            <Carousel setApi={setApi} className=" w-[80%] md:w-[90%] m-auto" opts={{ loop: true }}>
                <CarouselContent className="py-3">
                    {dummyImageData.map((person, index) => (
                        <CarouselItem key={person.id}
                            className={cn("w-full sm:basis-[33%]")}
                        >
                            <Card
                                className={cn("transition-transform duration-500", {
                                    "scale-[0.6]": index !== current - 1,
                                })}
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <Image
                                        width={500}
                                        height={500}
                                        src={person.image}
                                        alt={COMMON_ALT_TEXT}
                                        className="w-20 h-20 rounded-full object-cover mb-4"
                                    />
                                    <h3 className="text-lg font-semibold">{person.name}</h3>
                                    <p className="text-sm text-gray-500">{person.position}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
