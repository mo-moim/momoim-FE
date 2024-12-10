import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// 클라이언트용 axios 인스턴스
export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

clientAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// 서버용 axios 인스턴스
export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

serverAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { cookies } = require("next/headers");
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
