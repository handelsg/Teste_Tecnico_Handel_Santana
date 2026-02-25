import { createApolloClient } from "@/lib/apollo-client";
import { GET_LATEST_LAUNCHES } from "@/lib/queries";
import { HeroSection } from "@/components/HeroSection";
import type { Launch } from "@/types/launch";

// Força renderização dinâmica no servidor a cada requisição (SSR)
export const dynamic = "force-dynamic";

interface HomeData {
  launches: Launch[];
  launchNext: Launch | null;
}

export default async function HomePage() {
  let recentLaunches: Launch[] = [];
  let nextLaunch: Launch | null = null;

  try {
    const client = createApolloClient();
    const { data } = await client.query<HomeData>({
      query: GET_LATEST_LAUNCHES,
    });
    recentLaunches = data?.launches ?? [];
    nextLaunch = data?.launchNext ?? null;
  } catch (err) {
    console.error("Erro ao buscar lançamentos na home:", err);
  }

  return (
    <div>
      <HeroSection recentLaunches={recentLaunches} nextLaunch={nextLaunch} />
    </div>
  );
}
