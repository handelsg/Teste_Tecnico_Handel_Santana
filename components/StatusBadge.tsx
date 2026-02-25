import { Badge } from "@/components/ui/badge";
import { getLaunchStatus } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, HelpCircle } from "lucide-react";

interface StatusBadgeProps {
  launch_success: boolean | null;
  upcoming: boolean;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  success: {
    label: "Sucesso",
    variant: "success" as const,
    Icon: CheckCircle2,
  },
  failure: {
    label: "Falha",
    variant: "failure" as const,
    Icon: XCircle,
  },
  upcoming: {
    label: "Próximo",
    variant: "upcoming" as const,
    Icon: Clock,
  },
  unknown: {
    label: "Desconhecido",
    variant: "unknown" as const,
    Icon: HelpCircle,
  },
};

export function StatusBadge({
  launch_success,
  upcoming,
  showIcon = true,
  className,
}: StatusBadgeProps) {
  const status = getLaunchStatus({ launch_success, upcoming });
  const { label, variant, Icon } = statusConfig[status];

  return (
    <Badge
      variant={variant}
      className={className}
      data-testid="status-badge"
      role="status"
      aria-label={`Status da missão: ${label}`}
    >
      {showIcon && <Icon className="h-3 w-3 mr-1" aria-hidden="true" />}
      {label}
    </Badge>
  );
}
