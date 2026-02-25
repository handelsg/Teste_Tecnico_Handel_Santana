// Página de detalhes — renderizada no servidor (SSR)
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Globe,
  Youtube,
  BookOpen,
  Newspaper,
  MapPin,
  Rocket,
  ImageIcon,
  ExternalLink,
} from "lucide-react";
import { createApolloClient } from "@/lib/apollo-client";
import { GET_LAUNCH } from "@/lib/queries";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, getYouTubeEmbedUrl } from "@/lib/utils";
import type { Launch } from "@/types/launch";

interface LaunchDetailData {
  launch: Launch;
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const client = createApolloClient();
    const { data } = await client.query<LaunchDetailData>({
      query: GET_LAUNCH,
      variables: { id },
    });
    const launch = data?.launch;
    if (!launch) return { title: "Lançamento não encontrado" };
    return {
      title: launch.mission_name,
      description: launch.details ?? `Detalhes da missão ${launch.mission_name}`,
      openGraph: {
        title: launch.mission_name,
        description: launch.details ?? undefined,
        images: launch.links.mission_patch
          ? [{ url: launch.links.mission_patch }]
          : [],
      },
    };
  } catch {
    return { title: "Lançamento" };
  }
}

export default async function LaunchDetailPage({ params }: Props) {
  const { id } = await params;
  let launch: Launch | null = null;

  try {
    const client = createApolloClient();
    const { data } = await client.query<LaunchDetailData>({
      query: GET_LAUNCH,
      variables: { id },
    });
    launch = data?.launch ?? null;
  } catch (err) {
    console.error("Erro ao buscar detalhes do lançamento:", err);
  }

  if (!launch) notFound();

  const youtubeEmbedUrl = getYouTubeEmbedUrl(launch.links.video_link);
  const images = launch.links.flickr_images?.filter(Boolean) ?? [];
  const patch = launch.links.mission_patch || launch.links.mission_patch_small;

  const links = [
    {
      label: "Artigo",
      href: launch.links.article_link,
      Icon: Newspaper,
    },
    {
      label: "Wikipedia",
      href: launch.links.wikipedia,
      Icon: BookOpen,
    },
    {
      label: "YouTube",
      href: launch.links.video_link,
      Icon: Youtube,
    },
  ].filter((l) => l.href);

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 md:px-6 pt-8 pb-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-white/50 hover:text-white gap-2"
        >
          <Link href="/launches">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao catálogo
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 pb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Patch */}
          {patch && (
            <div className="flex-shrink-0">
              <Image
                src={patch}
                alt={`Patch da missão ${launch.mission_name}`}
                width={120}
                height={120}
                className="object-contain drop-shadow-lg"
                unoptimized
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <StatusBadge
                launch_success={launch.launch_success}
                upcoming={launch.upcoming}
              />
              {launch.upcoming && (
                <Badge variant="outline" className="text-white/40 border-white/10">
                  Missão futura
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {launch.mission_name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 text-white/65 text-sm">
              {launch.launch_date_utc && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-white/40 flex-shrink-0" aria-hidden="true" />
                  {formatDate(launch.launch_date_utc)}
                </span>
              )}
              {launch.launch_site?.site_name_long && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-white/40 flex-shrink-0" aria-hidden="true" />
                  {launch.launch_site.site_name_long}
                </span>
              )}
            </div>
          </div>

          {/* External links */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-2 md:flex-col md:items-end flex-shrink-0">
              {links.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} — abre em nova aba`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                  <ExternalLink className="h-3 w-3 text-white/30" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          {launch.details && (
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" aria-hidden="true" />
                Sobre a Missão
              </h2>
              <p className="text-white/75 leading-relaxed">{launch.details}</p>
            </section>
          )}

          {/* YouTube video */}
          {youtubeEmbedUrl && (
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-400" aria-hidden="true" />
                Vídeo da Missão
              </h2>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src={youtubeEmbedUrl}
                  title={`Vídeo — ${launch.mission_name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Flickr images */}
          {images.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                Galeria de Imagens
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.slice(0, 6).map((img, i) => (
                  <a
                    key={i}
                    href={img}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver imagem ${i + 1} da missão ${launch.mission_name} em tamanho completo (abre em nova aba)`}
                    className="block overflow-hidden rounded-xl border border-white/10 hover:border-blue-500/40 transition-colors group"
                  >
                    <Image
                      src={img}
                      alt={`Imagem ${i + 1} da missão ${launch.mission_name}`}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rocket info */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-400" aria-hidden="true" />
              Foguete
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-white/55 text-xs uppercase tracking-wider">
                  Nome
                </span>
                <p className="text-white font-medium mt-0.5">
                  {launch.rocket.rocket_name}
                </p>
              </div>
              {launch.rocket.rocket_type && (
                <div>
                  <span className="text-white/55 text-xs uppercase tracking-wider">
                    Tipo
                  </span>
                  <p className="text-white/80 mt-0.5">{launch.rocket.rocket_type}</p>
                </div>
              )}
              {launch.rocket.rocket?.description && (
                <div>
                  <span className="text-white/55 text-xs uppercase tracking-wider">
                    Descrição
                  </span>
                  <p className="text-white/65 text-xs leading-relaxed mt-0.5 line-clamp-4">
                    {launch.rocket.rocket.description}
                  </p>
                </div>
              )}
              {launch.rocket.rocket?.country && (
                <div>
                  <span className="text-white/55 text-xs uppercase tracking-wider">
                    País
                  </span>
                  <p className="text-white/80 mt-0.5">{launch.rocket.rocket.country}</p>
                </div>
              )}
              {launch.rocket.rocket?.wikipedia && (
                <a
                  href={launch.rocket.rocket.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${launch.rocket.rocket_name} no Wikipedia (abre em nova aba)`}
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs mt-2"
                >
                  <BookOpen className="h-3 w-3" aria-hidden="true" />
                  Ver no Wikipedia
                </a>
              )}
            </div>
          </section>

          {/* Launch site */}
          {launch.launch_site && (
            <section className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" aria-hidden="true" />
                Local de Lançamento
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {launch.launch_site.site_name_long || launch.launch_site.site_name}
              </p>
            </section>
          )}

          {/* Links */}
          {links.length > 0 && (
            <section className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-400" aria-hidden="true" />
                Links Externos
              </h2>
              <div className="space-y-2">
                {links.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — abre em nova aba`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all text-sm group"
                  >
                    <Icon className="h-4 w-4 text-white/30 group-hover:text-blue-400" aria-hidden="true" />
                    {label}
                    <ExternalLink className="h-3 w-3 text-white/20 ml-auto" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
