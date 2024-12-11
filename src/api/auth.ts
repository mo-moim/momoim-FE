import { clientAxios } from "@/lib/axios";
import { SignUpFormData } from "@/types/auth";

export const signUpApi = async (formData: SignUpFormData) => {
  const { data } = await clientAxios.post("/api/auths/signup", formData);
  return data;
};
