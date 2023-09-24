import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import figlet from "figlet";
import { articles } from "./modules/articles";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
  .get("/", () => {
    const body = figlet.textSync("(o) _ (o) ");
    return body
  })
  .group("/api", (app) =>
    app
      .use(cors())
      .use(swagger({
        documentation: {
          info: {
            title: "apartment-server",
            version: "1.0.0"
          }
        }
      }))
      .use(
        jwt({
          name: "jwt",
          secret: Bun.env.JWT_SECRET!,
        })
      )
      .use(cookie())
      .use(auth)
      .use(articles)
  ).listen(Bun.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
