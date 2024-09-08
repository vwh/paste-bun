import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";

import { PasteManager } from "@/database";
import { createRoutes } from "@/routes";

export const createApp = () => {
  const pasteManager = new PasteManager("./database/database.db");

  return new Elysia()
    .use(staticPlugin())
    .use(
      tailwind({
        path: "/public/assets/styles.css",
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
    .use(createRoutes(pasteManager));
};
