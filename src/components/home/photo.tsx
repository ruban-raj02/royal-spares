"use client";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

/** Neutral well with the photo on top. Shows fallback icon only if image fails to load. */
export function Photo({
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-well ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-line">
          <ImageIcon className="size-8 opacity-40" aria-hidden />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="eager"
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full ${
            fit === "cover" ? "object-cover" : "object-contain p-2"
          }`}
        />
      )}
    </div>
  );
}
