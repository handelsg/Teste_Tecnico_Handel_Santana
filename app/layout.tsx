import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApolloClientProvider } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SpaceX Portal — Lançamentos Espaciais",
    template: "%s | SpaceX Portal",
  },
  description:
    "Acompanhe todos os lançamentos da SpaceX: missões passadas, próximos voos, foguetes e muito mais.",
  keywords: ["SpaceX", "lançamentos", "foguetes", "espaço", "NASA", "Falcon 9", "Starship"],
  openGraph: {
    title: "SpaceX Portal",
    description: "Portal de lançamentos espaciais da SpaceX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ApolloClientProvider>
          {/* Link de saltar para o conteúdo principal — essencial para usuários
              de teclado e leitores de tela (WCAG 2.4.1 Bypass Blocks) */}
          <a href="#main-content" className="skip-link">
            Ir para o conteúdo principal
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ApolloClientProvider>
      </body>
    </html>
  );
}
