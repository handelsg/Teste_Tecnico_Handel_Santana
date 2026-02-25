"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import { LaunchCard } from "@/components/LaunchCard";
import { LaunchCardSkeleton } from "@/components/LaunchCardSkeleton";
import { GET_LAUNCHES } from "@/lib/queries";
import type { Launch } from "@/types/launch";

const PAGE_SIZE = 12;

interface LaunchesData {
  launches: Launch[];
}

export function LaunchCatalog() {
  const [offset, setOffset] = useState(0);
  const [allLaunches, setAllLaunches] = useState<Launch[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);

  const { loading, error, data, fetchMore } = useQuery<LaunchesData>(GET_LAUNCHES, {
    variables: { limit: PAGE_SIZE, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  // Inicializa lista quando os primeiros dados chegam (apenas uma vez)
  useEffect(() => {
    if (data?.launches && !initialized.current) {
      initialized.current = true;
      setAllLaunches(data.launches);
      if (data.launches.length < PAGE_SIZE) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    const newOffset = offset + PAGE_SIZE;

    try {
      const { data } = await fetchMore({
        variables: { limit: PAGE_SIZE, offset: newOffset },
      });
      const newLaunches = data?.launches ?? [];
      setAllLaunches((prev) => [...prev, ...newLaunches]);
      setOffset(newOffset);
      if (newLaunches.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch {
      // Silently fail, user can scroll again
    }
  }, [loading, hasMore, offset, fetchMore]);

  // Intersection Observer para infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  if (error && allLaunches.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 gap-4 text-center"
        role="alert"
        aria-live="assertive"
      >
        <AlertCircle className="h-12 w-12 text-red-400" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold text-white">Erro ao carregar lançamentos</h2>
          <p className="text-white/50 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!loading && allLaunches.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 gap-4 text-center"
        role="status"
        aria-live="polite"
      >
        <Inbox className="h-12 w-12 text-white/20" aria-hidden="true" />
        <p className="text-white/50">Nenhum lançamento encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid de lançamentos */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        data-testid="launch-grid"
        aria-label="Lista de lançamentos"
        aria-live="polite"
        aria-busy={loading}
      >
        {allLaunches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}

        {/* Skeletons de carregamento */}
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <LaunchCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Sentinel do Intersection Observer */}
      <div ref={sentinelRef} className="h-4 mt-8" aria-hidden="true" />

      {/* Indicador de carregamento */}
      {loading && allLaunches.length > 0 && (
        <div className="flex justify-center py-8" role="status" aria-live="polite">
          <Loader2 className="h-6 w-6 animate-spin text-blue-400" aria-hidden="true" />
          <span className="sr-only">Carregando mais lançamentos…</span>
        </div>
      )}

      {/* Fim da lista */}
      {!hasMore && allLaunches.length > 0 && (
        <p className="text-center text-white/65 text-sm py-8" role="status" aria-live="polite">
          Todos os {allLaunches.length} lançamentos foram exibidos.
        </p>
      )}
    </div>
  );
}
