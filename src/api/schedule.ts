import { clientAxios, serverAxios } from "@/lib/axios";

export const getScheduleApi = async (year: number) => {
  const { data } = await clientAxios.get(`api/schedule?year=${year}`);
  return { data: data.data, year };
};

export const getSchedulePrefetchApi = async (year: number) => {
  const { data } = await serverAxios.get(`api/schedule?year=${year}`);
  return { data: data.data, year };
};
