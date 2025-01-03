import { clientAxios, serverAxios } from "@/lib/axios";

export const getScheduleApi = async (year: number) => {
  console.log("스케쥴 클라이언트 요청");
  const { data } = await clientAxios.get(`api/schedule?year=${year}`);
  return { data: data.data, year };
};

export const getSchedulePrefetchApi = async (year: number) => {
  console.log("스케쥴 서버 요청");
  const { data } = await serverAxios.get(`api/schedule?year=${year}`);
  return { data: data.data, year };
};
