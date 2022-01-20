import axios from "axios";
import { parseCookies } from "nookies";

export function apiServices({ ctx = undefined }: any) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BACKEND}`,
    headers: {
      Authorization: `Bearer ${cookies["cripto.auth"]}`,
    },
  });

  return api;
}
