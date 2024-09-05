import { Elysia, redirect, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
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
  .post(
    "/",
    ({ body, set }) => {
      const { content, expiry, highlight } = body;
      const [pasteId, deleteToken] = insertPaste(content, highlight, expiry);
      set.headers["Set-Cookie"] = makeCookie(deleteToken);
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
    ({ params: { id }, cookie: { deleteToken }, set }) => {
      const result = getPaste(id);
      if (!result) {
        set.status = 404;
        return "Paste not found.";
      }
      if (deleteToken) set.headers["Set-Cookie"] = emptyCookie;
      return <Paste paste={result} deleteToken={deleteToken?.value} />;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get(
    "delete/:id",
    ({ params: { id } }) => {
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
