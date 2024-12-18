import { clientAxios } from "@/lib/axios";

export const getMyMoimApi = async () => {
  const { data } = await clientAxios.get(`api/gatherings/join?offset=0&limit=10`);
  return data.data;
};

export const getMyCreatedMoimApi = async () => {
  const { data } = await clientAxios.get(`api/gatherings/workspace?offset=0&limit=10`);
  return data.data;
};

export const getMyLikedMoimApi = async () => {
  const { data } = await clientAxios.get(`api/wishlist?offset=0&limit=10`);
  return data.data;
};
