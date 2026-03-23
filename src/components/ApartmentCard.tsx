import { BedDouble, Users, Maximize2 } from "lucide-react";
import { Apartment } from "@/data/apartments";
import { formatAED } from "@/lib/formatPrice";
import ImageCarousel from "./ImageCarousel";

interface ApartmentCardProps {
  apartment: Apartment;
  aspectClass?: string;
}

export default function ApartmentCard({ apartment, aspectClass }: ApartmentCardProps) {
  const { name, neighborhood, bedrooms, guests, sqm, priceFrom, images } =
    apartment;

  return (
    <div className="bg-brand-bg flex flex-col">
      <ImageCarousel images={images} alt={name} aspectClass={aspectClass} />

      <div className="pt-4 pb-2">
        {/* Name + price row */}
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-medium text-brand-heading">
            {name}
          </span>
          <span className="flex-1 border-b border-dotted border-brand-body/30 mb-1" />
          <span className="font-sans text-sm font-medium text-brand-body whitespace-nowrap">
            From AED {formatAED(priceFrom)}
          </span>
        </div>

        {/* Neighborhood + /month */}
        <div className="flex justify-between items-center mt-0.5">
          <span className="font-sans text-sm text-brand-body/60">
            {neighborhood}
          </span>
          <span className="font-sans text-xs text-brand-body/50">/ month</span>
        </div>

        {/* Metadata */}
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs font-sans text-brand-body/70">
            <BedDouble size={13} strokeWidth={1.5} />
            {bedrooms} {bedrooms === 1 ? "bedroom" : "bedrooms"}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-sans text-brand-body/70">
            <Users size={13} strokeWidth={1.5} />
            {guests} guests
          </span>
          <span className="flex items-center gap-1.5 text-xs font-sans text-brand-body/70">
            <Maximize2 size={13} strokeWidth={1.5} />
            {sqm} m²
          </span>
        </div>
      </div>
    </div>
  );
}
