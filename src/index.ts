import { Elysia, redirect, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { makeOwnerCookie } from "@/utils/cookie";
import {
  getPaste,
  insertPaste,
  deletePaste,
  getLatestPastes,
} from "@/database/functions";
import cuid from "cuid";

import Paste from "./components/paste";
import Home from "./components/home";

const AuthService = new Elysia({ name: "Service.Auth" }).derive(
  { as: "scoped" },
  ({ cookie: { ownerId }, set }) => {
    let ownerIdValue = ownerId.value;
    if (!ownerIdValue) {
      const ownerId = cuid();
      set.headers["Set-Cookie"] = makeOwnerCookie(ownerId);
      ownerIdValue = ownerId;
    }
    return {
      Auth: {
        ownerId: ownerIdValue,
      },
    };
  }
);

const app = new Elysia()
  .use(staticPlugin())
  .use(
    tailwind({
      path: "/public/styles.css",
      source: "./src/index.css",
      config: "./tailwind.config.js",
      options: {
        minify: true,
        map: true,
        autoprefixer: false,
      },
    })
  )
  .use(html())
  .use(AuthService)
  .get("/", () => Home())
  .post(
    "/",
    ({ body, Auth: { ownerId } }) => {
      const { content, expiry, highlight } = body;
      const pasteId = insertPaste(content, highlight, ownerId, expiry);
      return redirect(`/${pasteId}`);
    },
    {
      body: t.Object({
        content: t.String(),
        highlight: t.String(),
        expiry: t.Enum({
          month: "month",
          week: "week",
          day: "day",
        }),
      }),
    }
  )
  .get(
    "/:id",
    ({ set, params: { id }, Auth: { ownerId } }) => {
      const paste = getPaste(id);
      if (!paste) {
        set.status = 404;
        return "Paste not found.";
      }
      const isOwner = paste.owner === ownerId;
      return Paste({ paste, isOwner });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get(
    "delete/:id",
    ({ set, params: { id }, Auth: { ownerId } }) => {
      const paste = getPaste(id);
      if (!paste) {
        set.status = 404;
        return "Paste not found.";
      }
      if (paste.owner !== ownerId) {
        set.status = 403;
        return "Forbidden.";
      }
      deletePaste(id);
      return redirect("/");
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
