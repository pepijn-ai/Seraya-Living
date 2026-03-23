"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspectClass?: string;
}

export default function ImageCarousel({ images, alt, aspectClass = "aspect-[4/3]" }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollNext();
    },
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={`relative group ${aspectClass} overflow-hidden bg-brand-bg-alt`}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {images.map((publicId, i) => (
            <div key={i} className="relative flex-none w-full h-full">
              <Image
                src={getCloudinaryUrl(publicId, { width: 800, height: 600 })}
                alt={`${alt} — image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — visible on hover (desktop) */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} className="text-brand-body" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={16} className="text-brand-body" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => scrollTo(i, e)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === selectedIndex ? "bg-white w-3" : "bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
