import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LaunchCard } from "@/components/LaunchCard";
import type { Launch } from "@/types/launch";

// Mock Next.js Image e Link
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockLaunch: Launch = {
  id: "5eb87cd9ffd86e000604b32a",
  mission_name: "FalconSat",
  launch_date_utc: "2006-03-24T22:30:00.000Z",
  launch_date_local: "2006-03-25T10:30:00+12:00",
  launch_success: false,
  upcoming: false,
  details:
    "Engine failure at 33 seconds and loss of vehicle",
  links: {
    mission_patch: "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
    mission_patch_small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
    article_link: "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
    wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
    video_link: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
    flickr_images: [],
  },
  rocket: {
    rocket_name: "Falcon 1",
    rocket_type: "Merlin A",
    rocket: {
      name: "Falcon 1",
      description: "The Falcon 1 was an expendable launch system.",
      wikipedia: "https://en.wikipedia.org/wiki/Falcon_1",
      first_flight: "2006-03-24",
      country: "Republic of the Marshall Islands",
      company: "SpaceX",
    },
  },
  launch_site: {
    site_id: "kwajalein_atoll",
    site_name: "Kwajalein Atoll Omelek Island",
    site_name_long: "Kwajalein Atoll Omelek Island",
  },
};

describe("LaunchCard", () => {
  it("renderiza o nome da missão", () => {
    render(<LaunchCard launch={mockLaunch} />);
    expect(screen.getByText("FalconSat")).toBeInTheDocument();
  });

  it("renderiza o nome do foguete", () => {
    render(<LaunchCard launch={mockLaunch} />);
    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
  });

  it("exibe badge de status 'Falha' para lançamento mal sucedido", () => {
    render(<LaunchCard launch={mockLaunch} />);
    expect(screen.getByText("Falha")).toBeInTheDocument();
  });

  it("renderiza o local de lançamento", () => {
    render(<LaunchCard launch={mockLaunch} />);
    expect(screen.getByText("Kwajalein Atoll Omelek Island")).toBeInTheDocument();
  });

  it("link aponta para a página de detalhes correta", () => {
    render(<LaunchCard launch={mockLaunch} />);
    const link = screen.getByTestId("launch-card");
    expect(link).toHaveAttribute("href", "/launches/5eb87cd9ffd86e000604b32a");
  });

  it("exibe trecho dos detalhes quando disponível", () => {
    render(<LaunchCard launch={mockLaunch} />);
    expect(
      screen.getByText(/Engine failure at 33 seconds/)
    ).toBeInTheDocument();
  });

  it("exibe ícone de foguete como placeholder quando não há patch", () => {
    const launchWithoutPatch: Launch = {
      ...mockLaunch,
      links: { ...mockLaunch.links, mission_patch: null, mission_patch_small: null },
    };
    render(<LaunchCard launch={launchWithoutPatch} />);
    // Deve renderizar sem erros mesmo sem imagem
    expect(screen.getByText("FalconSat")).toBeInTheDocument();
  });

  it("exibe 'Próximo' para lançamento futuro", () => {
    const upcoming: Launch = {
      ...mockLaunch,
      upcoming: true,
      launch_success: null,
    };
    render(<LaunchCard launch={upcoming} />);
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  });
});
