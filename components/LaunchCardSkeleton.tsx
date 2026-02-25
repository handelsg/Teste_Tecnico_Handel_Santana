import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function LaunchCardSkeleton() {
  return (
    <Card
      className="h-full"
      role="status"
      aria-label="Carregando lançamento…"
      aria-busy="true"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Skeleton className="w-14 h-14 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-8 w-full mt-2" />
      </CardContent>
    </Card>
  );
}
