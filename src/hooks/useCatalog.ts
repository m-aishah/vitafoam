import { useEffect, useState } from "react";
import { initCatalog, catalogLoaded } from "@/lib/catalog";

export function useCatalogReady(): number {
  // Start at 1 if data is already loaded (e.g. navigating from another page)
  const [tick, setTick] = useState(() => (catalogLoaded ? 1 : 0));

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("mbg-catalog-changed", handler);
    // Always call initCatalog — if already loaded it dispatches immediately,
    // otherwise it fires the fetch (deduplicated if one is already in flight)
    initCatalog();
    return () => window.removeEventListener("mbg-catalog-changed", handler);
  }, []);

  return tick;
}
