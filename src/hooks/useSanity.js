// src/hooks/useSanity.js
// Generic data-fetching hook — NO JSX in this file

import { useState, useEffect } from "react";
import { client } from "../lib/sanityClient";

/**
 * useSanity(query, params?)
 * Returns { data, loading, error }
 */
export function useSanity(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    client
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Sanity fetch error:", err);
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}
