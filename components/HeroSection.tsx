import Link from "next/link";
import Image from "next/image";
import { Rocket, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaunchCard } from "@/components/LaunchCard";
import type { Launch } from "@/types/launch";

interface HeroSectionProps {
  recentLaunches: Launch[];
  nextLaunch: Launch | null;
}

// Posições determinísticas para as estrelas — evita hydration mismatch no SSR.
// Usa o ângulo dourado (~137.508°) para distribuição uniforme.
const STARS = Array.from({ length: 60 }, (_, i) => ({
  width: `${(i % 2) + 1}px`,
  height: `${(i % 2) + 1}px`,
  top: `${((i * 137.508) % 100).toFixed(1)}%`,
  left: `${((i * 162.3) % 100).toFixed(1)}%`,
  opacity: +(0.1 + (i % 7) * 0.1).toFixed(2),
}));

export function HeroSection({ recentLaunches, nextLaunch }: HeroSectionProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-black to-black" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-indigo-900/10 blur-3xl" />
        </div>

        {/* Stars decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/60"
              style={{
                width: star.width,
                height: star.height,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            Portal de Missões Espaciais
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Explorando o{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Universo
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed px-2">
            Acompanhe todos os lançamentos da SpaceX em tempo real — desde as
            missões históricas até os próximos voos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8"
            >
              <Link href="/launches">
                Ver todos os lançamentos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator — decorativo, oculto de leitores de tela */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce"
          aria-hidden="true"
        >
          <span>Role para explorar</span>
          <div className="w-px h-8 bg-white/20 rounded-full" />
        </div>
      </section>

      {/* Next launch */}
      {nextLaunch && (
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-black p-6 md:p-8">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              Próximo Lançamento
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                {nextLaunch.links.mission_patch_small ? (
                  <Image
                    src={nextLaunch.links.mission_patch_small}
                    alt="Patch da missão"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center" aria-hidden="true">
                    <Rocket className="h-8 w-8 text-blue-400" aria-hidden="true" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {nextLaunch.mission_name}
                  </h2>
                  <p className="text-white/65 mt-1">
                    {nextLaunch.rocket.rocket_name}
                  </p>
                  {nextLaunch.details && (
                    <p className="text-white/55 text-sm mt-2 max-w-xl line-clamp-2">
                      {nextLaunch.details}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:ml-auto flex-shrink-0">
                <Button asChild variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                  <Link href={`/launches/${nextLaunch.id}`}>
                    Ver detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent launches */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Lançamentos Recentes
            </h2>
            <p className="text-white/65 text-sm mt-1">
              Os últimos voos realizados pela SpaceX
            </p>
          </div>
          <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
            <Link href="/launches">
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentLaunches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 md:px-6 mb-20" aria-label="Estatísticas da SpaceX">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lançamentos realizados", value: "200+" },
            { label: "Taxa de sucesso", value: "~97%" },
            { label: "Foguetes ativos", value: "Falcon 9, Starship" },
            { label: "Missões tripuladas", value: "30+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <dd className="text-2xl font-bold text-white mb-1">{stat.value}</dd>
              <dt className="text-xs text-white/65">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
