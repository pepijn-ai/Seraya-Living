import Image from "next/image";
import { locations } from "@/data/locations";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import FadeIn from "./FadeIn";

export default function Locations() {
  return (
    <section className="bg-brand-bg-alt py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-12">
            Available across Dubai&apos;s prime districts
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc, i) => (
            <FadeIn key={loc.name} delay={i * 100}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={getCloudinaryUrl(loc.image, { width: 640, height: 480 })}
                  alt={loc.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center font-serif text-xl md:text-2xl font-medium text-white">
                  {loc.name}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
