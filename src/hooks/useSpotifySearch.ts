import { useState, useEffect, useRef } from "react";
import { searchTracks } from "../spotify/api";
import type { SpotifyTrack } from "../spotify/types";

export function useSpotifySearch(isConnected: boolean) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isConnected || !query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const tracks = await searchTracks(query);
        setResults(tracks);
      } catch (e) {
        setError("Search failed. Try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, isConnected]);

  return { query, setQuery, results, loading, error };
}
