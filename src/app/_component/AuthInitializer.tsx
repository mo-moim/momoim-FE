"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { clientAxios } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";

export function AuthInitializer() {
  const { setAccessToken, logout, isLoggedIn } = useAuthStore();
  const queryClient = useQueryClient();
  const initialized = useRef(false);

  useEffect(() => {
    if (!isLoggedIn || initialized.current) return;
    initialized.current = true;

    const validateAccessToken = async () => {
      try {
        const response = await clientAxios.post("/api/auths/refresh");
        const { accessToken, ...userInfo } = response.data.data;
        setAccessToken(accessToken.token);
        queryClient.setQueryData(["user"], userInfo);
      } catch (error) {
        queryClient.setQueryData(["user"], null);
        logout();
      }
    };

    validateAccessToken();
  }, [isLoggedIn, setAccessToken, queryClient, logout]);

  return null;
}
