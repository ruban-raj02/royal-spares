"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BikesIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("royalspares_active_bike") : null;
    router.replace(`/bikes/${saved || "classic-350"}`);
  }, [router]);

  return null;
}
