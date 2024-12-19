import { clientAxios } from "@/lib/axios";
import { GatheringParams, GatheringResponse } from "@/types/gathering";

export const fetchGatherings = async (params: GatheringParams): Promise<GatheringResponse> => {
  const { category, subCategory, ...restParams } = params;
  const queryParams = new URLSearchParams();

  category?.forEach((cat) => queryParams.append("category", cat));
  subCategory?.forEach((sub) => queryParams.append("subCategory", sub));

  Object.entries(restParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const { data } = await clientAxios.get<GatheringResponse>(`/api/gatherings?${queryParams.toString()}`);
  return data;
};

export const fetchRecommendedGatherings = async (
  params: Omit<GatheringParams, "category" | "subCategory">,
): Promise<GatheringResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const { data } = await clientAxios.get<GatheringResponse>(`/api/gatherings/recommend?${queryParams.toString()}`);
  return data;
};
