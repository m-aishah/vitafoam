import { useEffect, useState } from "react";
import { initCatalog } from "@/lib/catalog";

/**
 * Triggers a Supabase reload on mount and returns a tick that increments
 * each time the catalog changes, so callers can use it as a useMemo dep.
 */
export function useCatalogReady(): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("mbg-catalog-changed", handler);
    initCatalog();
    return () => window.removeEventListener("mbg-catalog-changed", handler);
  }, []);
  return tick;
}
