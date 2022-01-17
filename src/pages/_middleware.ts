import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.url !== `http://localhost:3000/login`) {
    if (!req.cookies["cripto.auth"]) {
      return Response.redirect("/login");
    }
  }
}
