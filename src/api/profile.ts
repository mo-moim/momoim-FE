import { clientAxios } from "@/lib/axios";

export const getProfileApi = async () => {
  const { data } = await clientAxios.get(`api/auths/user`);
  return data.data;
};

// export const postReviewApi = async (gatheringId: number, score: number, title: string, comment: string) => {
//   const { data } = await clientAxios.post(`api/reviews`, {
//     gatheringId,
//     score,
//     title,
//     comment,
//   });
//   return data;
// };

// export const deleteReviewApi = async (id: number) => {
//   console.log(id);
//   const { data } = await clientAxios.delete(`api/reviews/${id}`);
//   return data;
// };

// export const patchReviewApi = async (id: number, score: number, title: string, comment: string) => {
//   console.log(id);
//   const { data } = await clientAxios.patch(`api/reviews/${id}`, {
//     score,
//     title,
//     comment,
//   });
//   return data;
// };
