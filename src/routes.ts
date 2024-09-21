import { Elysia, redirect, t } from "elysia";

import type { PasteManager } from "@/database";
import authPlugin from "@/auth";

import { submitSchema, editSchema, handleZodError } from "@/zod";
import { ZodError } from "zod";

import Home from "@/pages/home";
import Paste from "@/pages/paste";
import Edit from "@/pages/edit";
import ErrorPage from "@/pages/error";
import History from "@/pages/history";

interface Auth {
  ownerId: string;
}

interface Query {
  page?: string;
}

export const createRoutes = (pasteManager: PasteManager) => {
  return new Elysia()
    .use(authPlugin)
    .get("/", () => Home())
    .post(
      "/",
      ({ set, error, body, Auth: { ownerId } }) => {
        try {
          const { content, expiry, highlight } = submitSchema.parse(body);
          const pasteId = pasteManager.insertPaste(
            content,
            highlight,
            ownerId,
            expiry
          );
          return redirect(`/${pasteId}`);
        } catch (err) {
          if (err instanceof ZodError) {
            set.status = 400;
            return handleZodError(err);
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
          headers: { "Content-Type": "text/plain; charset=UTF-8" },
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
    )
    .get(
      "edit/:id",
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
        return Edit({ paste });
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
    .post(
      "edit/:id",
      ({ set, error, params: { id }, body, Auth: { ownerId } }) => {
        try {
          const { content, highlight } = editSchema.parse(body);
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
              errorMessage: "You do not have permission to edit this paste.",
            });
          }
          pasteManager.updatePaste(id, content, highlight);
          return redirect(`/${id}`);
        } catch (err) {
          if (err instanceof ZodError) {
            set.status = 400;
            return handleZodError(err);
          }
          return error(500, "Internal server error");
        }
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        body: t.Object({
          content: t.String(),
          highlight: t.String(),
        }),
      }
    )

    .get("/history", ({ Auth, query }: { Auth: Auth; query: Query }) => {
      const limit = 5;

      const page = parseInt(query.page || "1", 10);

      const offset = (page - 1) * limit;

      const totalPastes = pasteManager.getPasteCountByOwner(Auth.ownerId);

      const totalPages = Math.ceil(totalPastes / limit);

      const pastes = pasteManager.getAllPastesByOwner(
        Auth.ownerId,
        limit,
        offset
      );

      return History({
        pastes,
        currentPage: page,
        totalPages,
      });
    });
};
