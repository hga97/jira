import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import qs from "qs";
import { useCallback } from "react";

const url = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string | null;
}

export const http = (
  endPoint: string,
  { data, token, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${url}/${endPoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endPoint, config]: Parameters<typeof http>) =>
      http(endPoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
