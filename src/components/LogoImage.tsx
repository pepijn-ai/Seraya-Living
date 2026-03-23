"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoImageProps {
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
  /** Use on light backgrounds — blends white bg away via multiply */
  blendMultiply?: boolean;
  /** Use on dark backgrounds — renders as white text logo */
  invertToWhite?: boolean;
}

export default function LogoImage({
  width,
  height,
  style,
  className,
  blendMultiply,
  invertToWhite,
}: LogoImageProps) {
  const [failed, setFailed] = useState(false);

  const fallbackColor = invertToWhite ? "text-white" : "text-brand-heading";

  if (failed) {
    return (
      <span
        className={`font-serif font-medium ${fallbackColor} ${className ?? ""}`}
        style={{ fontSize: width * 0.15, ...style }}
      >
        Seraya Living
      </span>
    );
  }

  const blendStyle: React.CSSProperties = blendMultiply
    ? { mixBlendMode: "multiply" }
    : invertToWhite
    ? { filter: "brightness(0) invert(1)" }
    : {};

  return (
    <Image
      src="/images/seraya-living-logo.png"
      alt="Seraya Living"
      width={width}
      height={height}
      className={className}
      style={{ ...blendStyle, ...style }}
      onError={() => setFailed(true)}
      priority
    />
  );
}
