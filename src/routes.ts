import { Elysia, redirect, t } from "elysia";

import { z } from "zod";
import type { PasteManager } from "@/database";
import authPlugin from "@/auth";

import Home from "@/pages/home";
import Paste from "@/pages/paste";
import ErrorPage from "@/pages/error";

// Zod Schemas
export const Period = z.enum(["month", "week", "day", "hour"]);
export const bodySchema = z.object({
  content: z.string().max(5000, "Content must not exceed 5,000 characters."),
  highlight: z.string().max(20, "Highlight must not exceed 20 characters."),
  expiry: Period,
});

export const createRoutes = (pasteManager: PasteManager) => {
  return new Elysia()
    .use(authPlugin)
    .get("/", () => Home())
    .post(
      "/",
      ({ set, error, body, Auth: { ownerId } }) => {
        try {
          const { content, expiry, highlight } = bodySchema.parse(body);
          const pasteId = pasteManager.insertPaste(
            content,
            highlight,
            ownerId,
            expiry
          );
          return redirect(`/${pasteId}`);
        } catch (err) {
          if (err instanceof z.ZodError) {
            const errorMessages = err.errors
              .map((e) => `${e.path.join(".")}: ${e.message}`)
              .join(", ");
            set.status = 400;
            return ErrorPage({
              statsMessage: "400 - Bad Request",
              errorMessage: errorMessages,
            });
          }
          return error(500, "Internal server error");
        }
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
      ({ set, params: { id }, Auth: { ownerId } }) => {
        const paste = pasteManager.getPaste(id);
        if (!paste) {
          set.status = 404;
          return ErrorPage({
            statsMessage: "404 - Not Found",
            errorMessage: "Paste not found.",
          });
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
      "/raw/:id",
      ({ set, params: { id } }) => {
        const paste = pasteManager.getPaste(id);
        if (!paste) {
          set.status = 404;
          return ErrorPage({
            statsMessage: "404 - Not Found",
            errorMessage: "Paste not found.",
          });
        }
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
      ({ set, params: { id }, Auth: { ownerId } }) => {
        const paste = pasteManager.getPaste(id);
        if (!paste) {
          set.status = 404;
          return ErrorPage({
            statsMessage: "404 - Not Found",
            errorMessage: "Paste not found.",
          });
        }
        if (paste.owner !== ownerId) {
          set.status = 403;
          return ErrorPage({
            statsMessage: "403 - Forbidden",
            errorMessage: "You do not have permission to delete this paste.",
          });
        }
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
