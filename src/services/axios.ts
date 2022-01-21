import axios from "axios";
import { parseCookies } from "nookies";

export function apiServices({ ctx = undefined }: any) {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BACKEND}`,
  });

  return api;
}
