// Catálogo de lançamentos — Client-Side Rendering com infinite scroll
import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import { LaunchCatalog } from "@/components/LaunchCatalog";

export const metadata: Metadata = {
  title: "Catálogo de Lançamentos",
  description:
    "Explore todos os lançamentos da SpaceX — filtre por status, foguete e muito mais.",
};

export default function LaunchesPage() {
  return (
    <div className="min-h-screen">
      {/* Header da página */}
      <div className="border-b border-white/5 bg-gradient-to-b from-blue-950/10 to-transparent">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20" aria-hidden="true">
              <Rocket className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">
              SpaceX
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Catálogo de Lançamentos
          </h1>
          <p className="text-white/65 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Todos os lançamentos passados e futuros da SpaceX. Role a página para
            carregar mais missões automaticamente.
          </p>
        </div>
      </div>

      {/* Catálogo com infinite scroll (CSR) */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <LaunchCatalog />
      </div>
    </div>
  );
}
