import Link from "next/link";
import { Rocket, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-sm mt-auto" aria-label="Rodapé">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/80" aria-label="SpaceX Portal">
            <Rocket className="h-5 w-5 text-blue-400" aria-hidden="true" />
            <span className="font-semibold">SpaceX Portal</span>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-5" aria-hidden="true" />

          <nav aria-label="Links do rodapé" className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/launches" className="hover:text-white transition-colors">
              Lançamentos
            </Link>
          </nav>

          <Separator orientation="vertical" className="hidden md:block h-5" aria-hidden="true" />

          <div className="flex items-center gap-3 text-sm text-white/40">
            <a
              href="https://github.com/r-spacex/SpaceX-API"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
              aria-label="SpaceX API no GitHub (abre em nova aba)"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              SpaceX API
            </a>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-white/30">
          Dados fornecidos pela API pública da SpaceX • Projeto de teste técnico
        </p>
      </div>
    </footer>
  );
}
