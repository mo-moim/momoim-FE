import { getMoimListQuery } from "@/queries/gatherings/getMoimListQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import MoimPage from "../_component/MoimPage";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const queryClient = new QueryClient();
  const upperCategory = params.category.toUpperCase();

  await queryClient.prefetchInfiniteQuery(getMoimListQuery.initialGatheringsQuery(upperCategory));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoimPage initialCategory={params.category.toUpperCase()} />
      </HydrationBoundary>
    </Suspense>
  );
}
