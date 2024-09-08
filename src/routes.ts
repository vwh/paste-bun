import { Elysia, redirect, t } from "elysia";

import type { PasteManager } from "@/database";
import authPlugin from "@/auth";

import Home from "@/pages/home";
import Paste from "@/pages/paste";

export const createRoutes = (pasteManager: PasteManager) => {
  return new Elysia()
    .use(authPlugin)
    .get("/", () => Home())
    .post(
      "/",
      ({ body, Auth: { ownerId } }) => {
        const { content, expiry, highlight } = body;
        const pasteId = pasteManager.insertPaste(
          content,
          highlight,
          ownerId,
          expiry
        );
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
            hour: "hour",
          }),
        }),
      }
    )
    .get(
      "/:id",
      ({ error, params: { id }, Auth: { ownerId } }) => {
        const paste = pasteManager.getPaste(id);
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
      ({ error, params: { id } }) => {
        const paste = pasteManager.getPaste(id);
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
        const paste = pasteManager.getPaste(id);
        if (!paste) return error(404, "Paste not found.");
        if (paste.owner !== ownerId)
          return error(403, "You are not the owner of this paste.");

        pasteManager.deletePaste(id);
        return redirect("/");
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    );
};
