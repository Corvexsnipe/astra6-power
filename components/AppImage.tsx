"use client";

import Image, { type ImageProps } from "next/image";

function isExternalSrc(src: ImageProps["src"]): boolean {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

/**
 * External CDN images (e.g. postimg) break on Vercel when passed through
 * the default optimizer or when the host blocks cross-site referrers.
 */
export default function AppImage({
  src,
  unoptimized,
  referrerPolicy,
  ...props
}: ImageProps) {
  const external = isExternalSrc(src);

  return (
    <Image
      src={src}
      unoptimized={unoptimized ?? external}
      referrerPolicy={
        referrerPolicy ?? (external ? "no-referrer" : undefined)
      }
      {...props}
    />
  );
}
