import { describe, it, expect } from "vitest";
import { formatDate, formatDateShort, getLaunchStatus, getYouTubeEmbedUrl, cn } from "@/lib/utils";

describe("formatDate", () => {
  it("formata data corretamente em pt-BR", () => {
    const result = formatDate("2021-09-16T00:02:00.000Z");
    expect(result).toContain("2021");
    expect(result).toContain("setembro");
  });

  it("retorna 'Data desconhecida' quando data é null", () => {
    expect(formatDate(null)).toBe("Data desconhecida");
  });
});

describe("formatDateShort", () => {
  it("formata data curta corretamente", () => {
    const result = formatDateShort("2021-09-16T00:02:00.000Z");
    expect(result).toContain("2021");
  });

  it("retorna '—' quando data é null", () => {
    expect(formatDateShort(null)).toBe("—");
  });
});

describe("getLaunchStatus", () => {
  it("retorna 'upcoming' quando upcoming=true", () => {
    expect(getLaunchStatus({ launch_success: null, upcoming: true })).toBe("upcoming");
  });

  it("retorna 'success' quando launch_success=true e upcoming=false", () => {
    expect(getLaunchStatus({ launch_success: true, upcoming: false })).toBe("success");
  });

  it("retorna 'failure' quando launch_success=false e upcoming=false", () => {
    expect(getLaunchStatus({ launch_success: false, upcoming: false })).toBe("failure");
  });

  it("retorna 'unknown' quando launch_success=null e upcoming=false", () => {
    expect(getLaunchStatus({ launch_success: null, upcoming: false })).toBe("unknown");
  });
});

describe("getYouTubeEmbedUrl", () => {
  it("retorna URL de embed para link youtube.com/watch?v=ID", () => {
    expect(getYouTubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("retorna URL de embed para link youtu.be/ID", () => {
    expect(getYouTubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("retorna null para link null", () => {
    expect(getYouTubeEmbedUrl(null)).toBeNull();
  });

  it("retorna null para link inválido", () => {
    expect(getYouTubeEmbedUrl("https://vimeo.com/12345")).toBeNull();
  });
});

describe("cn (classnames)", () => {
  it("combina classes corretamente", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("remove classes Tailwind conflitantes", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });
});
