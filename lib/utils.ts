import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Data desconhecida";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(dateStr));
}

export function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function getLaunchStatus(launch: {
  launch_success: boolean | null;
  upcoming: boolean;
}): "success" | "failure" | "upcoming" | "unknown" {
  if (launch.upcoming) return "upcoming";
  if (launch.launch_success === true) return "success";
  if (launch.launch_success === false) return "failure";
  return "unknown";
}

export function getYouTubeEmbedUrl(videoLink: string | null): string | null {
  if (!videoLink) return null;
  try {
    const url = new URL(videoLink);
    // Suporta youtube.com/watch?v=ID e youtu.be/ID
    const id =
      url.searchParams.get("v") ??
      (url.hostname === "youtu.be" ? url.pathname.slice(1) : null);
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}
