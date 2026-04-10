interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
  quality?: string;
}

export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  // Local public-folder paths — return as-is
  if (publicId.startsWith("/")) return publicId;

  const { width, height, crop = "fill", gravity = "auto", quality = "auto" } = options;

  // URL-encode special characters in public IDs
  const encoded = publicId
    .split("/")
    .map((segment) =>
      segment
        .replace(/ /g, "%20")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
    )
    .join("/");

  const transforms = ["f_auto", `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) {
    transforms.push(`c_${crop}`);
    transforms.push(`g_${gravity}`);
  }

  return `https://res.cloudinary.com/dce1arrhg/image/upload/${transforms.join(",")}/${encoded}`;
}
