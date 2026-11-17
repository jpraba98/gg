"use client";

import { useEffect } from "react";

/**
 * Backup for direct links like /services#book: once the page has rendered,
 * scroll the hashed section into view (some browsers jump before the
 * section exists, or restore the old scroll position afterwards).
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}
