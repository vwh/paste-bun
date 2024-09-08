import { Elysia, redirect, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";

import {
  getPaste,
  insertPaste,
  deletePaste,
  getLatestPastes,
} from "@/database/functions";
import { makeOwnerCookie } from "@/utils/cookie";
import cuid from "cuid";

import Paste from "@/pages/paste";
import Home from "@/pages/home";

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
    ({ error, params: { id }, Auth: { ownerId } }) => {
      const paste = getPaste(id);
      if (!paste) return error(404, "Paste not found.");

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
    "/raw/:id",
    ({ error, params: { id }, Auth: { ownerId } }) => {
      const paste = getPaste(id);
      if (!paste) return error(404, "Paste not found.");

      return new Response(paste.content, {
        headers: { "Content-Type": "text/plain" },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get(
    "delete/:id",
    ({ error, params: { id }, Auth: { ownerId } }) => {
      const paste = getPaste(id);
      if (!paste) return error(404, "Paste not found.");
      if (paste.owner !== ownerId)
        return error(403, "You are not the owner of this paste.");

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
