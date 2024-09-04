import { Elysia, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import type { PastePostBody } from "./types";
import {
  getPaste,
  insertPaste,
  deletePaste,
  getLatestPastes,
} from "@/database/functions";
import { makeCookie, emptyCookie } from "@/utils/cookie";

import Paste from "./components/paste";
import Home from "./components/home";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .get("/", () => <Home />)
  .get("/:id", ({ params: { id }, cookie: { deleteToken }, set }) => {
    const result = getPaste(id);
    if (!result) return <p>Not found</p>;
    if (deleteToken) set.headers["Set-Cookie"] = emptyCookie;
    return <Paste paste={result} deleteToken={deleteToken?.value} />;
  })
  .post("/", ({ body }: { body: PastePostBody }) => {
    const { content, expiry, highlight } = body;
    const [pasteId, deleteToken] = insertPaste(content, highlight, expiry);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${pasteId}`,
        "Set-Cookie": makeCookie(deleteToken),
      },
    });
  })
  .get("delete/:id", ({ params: { id } }) => {
    deletePaste(id);
    return Response.redirect("/");
  })
  .listen(3000);

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
