"use client";
import { useState } from "react";
import { CategoryDetail } from "@/lib/data";
import { CategoryHero } from "./category-hero";
import { CategoryCatalog } from "./category-catalog";
import { CategoryServiceBulletin } from "./category-service-bulletin";
import { CategoryVinBanner } from "./category-vin-banner";

export function CategoryPageContainer({ category }: { category: CategoryDetail }) {
  const [selectedBikeFilter, setSelectedBikeFilter] = useState("all");

  return (
    <>
      {/* 1. Category Hero (Header, Telemetry, Category Switcher & Compatibility Bar) */}
      <CategoryHero
        category={category}
        selectedBikeFilter={selectedBikeFilter}
        onSelectBikeFilter={setSelectedBikeFilter}
      />

      {/* 2. Main Products Catalog (Sub-Categories, Filters Sidebar & Product Grid / List) */}
      <CategoryCatalog
        category={category}
        selectedBikeFilter={selectedBikeFilter}
      />

      {/* 3. Official Workshop Service Bulletin (Bleeding & Bedding Guide, PDF Download) */}
      <CategoryServiceBulletin category={category} />

      {/* 4. Bottom Zero-Dispute VIN Fitment Banner & Pressure Test Guarantee */}
      <CategoryVinBanner category={category} />
    </>
  );
}
