import axios from "axios";
import { parseCookies } from "nookies";

export function apiServices({ ctx = undefined }: any) {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BACKEND}`,
  });

  api.interceptors.request.use((config) => {
    const { ["cripto.auth"]: token } = parseCookies(ctx ? ctx : null);

    try {
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    } catch (e) {
      console.log({ error: e });
    }
  });

  return api;
}
