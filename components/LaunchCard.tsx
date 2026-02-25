import Link from "next/link";
import Image from "next/image";
import { Calendar, Rocket, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateShort } from "@/lib/utils";
import type { Launch } from "@/types/launch";

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const patch =
    launch.links.mission_patch_small || launch.links.mission_patch;

  return (
    <Link
      href={`/launches/${launch.id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
      data-testid="launch-card"
      aria-label={`Ver detalhes da missão ${launch.mission_name}`}
    >
      <Card className="h-full hover:border-blue-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group-focus:border-blue-400">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            {/* Patch image */}
            <div className="flex-shrink-0" aria-hidden="true">
              {patch ? (
                <Image
                  src={patch}
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-lg object-contain bg-white/5 p-1"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-white/20" aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle
                className="text-white text-base leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors"
                title={launch.mission_name}
              >
                {launch.mission_name}
              </CardTitle>
              <div className="mt-2">
                <StatusBadge
                  launch_success={launch.launch_success}
                  upcoming={launch.upcoming}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-white/60">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-white/40 flex-shrink-0" aria-hidden="true" />
            <span>{formatDateShort(launch.launch_date_utc)}</span>
          </div>

          {/* Rocket */}
          <div className="flex items-center gap-2">
            <Rocket className="h-3.5 w-3.5 text-white/40 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{launch.rocket.rocket_name}</span>
          </div>

          {/* Launch site */}
          {launch.launch_site?.site_name && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-white/40 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{launch.launch_site.site_name}</span>
            </div>
          )}

          {/* Details preview */}
          {launch.details && (
            <p className="text-white/65 text-xs leading-relaxed line-clamp-2 pt-1 border-t border-white/10">
              {launch.details}
            </p>
          )}

          {/* More info indicator — visível ao foco (leitores de tela obtêm contexto pelo aria-label do link) */}
          <div className="flex items-center gap-1 text-blue-400/80 text-xs pt-1 group-hover:text-blue-400 transition-colors" aria-hidden="true">
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            <span>Ver detalhes</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
