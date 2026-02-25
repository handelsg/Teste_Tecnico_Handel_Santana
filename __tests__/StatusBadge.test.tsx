import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/StatusBadge";

describe("StatusBadge", () => {
  it("exibe 'Sucesso' quando launch_success é true", () => {
    render(<StatusBadge launch_success={true} upcoming={false} />);
    expect(screen.getByText("Sucesso")).toBeInTheDocument();
  });

  it("exibe 'Falha' quando launch_success é false", () => {
    render(<StatusBadge launch_success={false} upcoming={false} />);
    expect(screen.getByText("Falha")).toBeInTheDocument();
  });

  it("exibe 'Próximo' quando upcoming é true", () => {
    render(<StatusBadge launch_success={null} upcoming={true} />);
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  });

  it("exibe 'Desconhecido' quando não há informação de sucesso", () => {
    render(<StatusBadge launch_success={null} upcoming={false} />);
    expect(screen.getByText("Desconhecido")).toBeInTheDocument();
  });

  it("upcoming tem prioridade sobre launch_success", () => {
    render(<StatusBadge launch_success={true} upcoming={true} />);
    expect(screen.getByText("Próximo")).toBeInTheDocument();
    expect(screen.queryByText("Sucesso")).not.toBeInTheDocument();
  });

  it("renderiza com data-testid correto", () => {
    render(<StatusBadge launch_success={true} upcoming={false} />);
    expect(screen.getByTestId("status-badge")).toBeInTheDocument();
  });
});
