import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryAttempted?: boolean;
}

interface RefreshResponse {
  data: {
    accessToken: {
      token: string;
      expiredAt: number;
    };
  };
}

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

clientAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // 로그아웃 API는 토큰 검증 없이 처리
    if (originalRequest.url === "/api/auths/logout") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.retryAttempted) {
      originalRequest.retryAttempted = true;

      try {
        const response = await clientAxios.post<RefreshResponse>("/api/auths/refresh");
        const { accessToken } = response.data.data;

        // 새 accessToken을 store에 저장
        useAuthStore.getState().setAccessToken(accessToken.token);

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken.token}`;
        }
        return await clientAxios(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패시 로그아웃 처리
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

clientAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 로그아웃과 토큰 갱신 요청에는 토큰을 넣지 않음
  if (config.url === "/api/auths/logout" || config.url === "/api/auths/refresh") {
    return config;
  }

  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

// 서버용 axios 인스턴스
export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

serverAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

serverAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { headers } = require("next/headers");
  const authHeader = headers().get("authorization");

  if (authHeader) {
    config.headers.set("Authorization", authHeader);
  }

  return config;
});
