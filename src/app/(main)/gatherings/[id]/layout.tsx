import { gatheringDetailGetApi } from "@/api/gatherings";
import BackButton from "@/app/_component/BackButton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import GatheringDeteilContent from "./_component/GatheringDeteil";
import DetailPageTab from "./_component/DetailPageTab";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const queryClient = new QueryClient();
  const id = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["gatheringDetail", id],
    queryFn: () => gatheringDetailGetApi(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <BackButton />
          <GatheringDeteilContent id={id} />
        </div>
        <DetailPageTab id={id} />
      </div>
      {children}
    </HydrationBoundary>
  );
}
