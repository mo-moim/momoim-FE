import { Skeleton } from "@/components/ui/skeleton";

export default function MapSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-400">
      <Skeleton className="h-[300px] w-full" />
      <div className="p-5">
        <Skeleton className="h-6" />
      </div>
    </div>
  );
}
