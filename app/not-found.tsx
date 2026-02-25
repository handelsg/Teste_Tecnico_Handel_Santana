import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="p-4 rounded-full border border-white/10 bg-white/5" aria-hidden="true">
        <Rocket className="h-10 w-10 text-white/30" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3" aria-label="Erro 404 — Página não encontrada">
          404
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold text-white/80 mb-3">
          Página não encontrada
        </h2>
        <p className="text-white/65 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
          O lançamento que você está procurando não existe ou foi removido.
        </p>
      </div>
      <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white">
        <Link href="/launches">Ver todos os lançamentos</Link>
      </Button>
    </div>
  );
}
