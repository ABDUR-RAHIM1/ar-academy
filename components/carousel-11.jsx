"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function SlideScale() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    (<div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs" opts={{ loop: true }}>
        <CarouselContent className="py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className={cn("basis-[33%]", {})}>
              <Card
                className={cn("transition-transform duration-500", {
                  "scale-[0.6]": index !== current - 1,
                })}>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>)
  );
}
