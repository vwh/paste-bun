import { Html } from "@elysiajs/html";
import type { Paste as PasteType } from "@/types";

import Head from "@/components/head";
import SelectHighlight from "@/components/select-highlight";
import GithubIcon from "@/components/icons/github";
import DeleteIcon from "@/components/icons/delete";

interface EditProps {
  paste: PasteType;
}

export default function Edit({ paste }: EditProps) {
  return (
    <html lang="en">
      <head>
        <Head />
      </head>
      <body class="bg-gray-800 text-gray-100 h-screen flex flex-col">
        <nav class="bg-gray-800 p-3 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2">
            <img
              class="h-9"
              src="/public/icons/logo.webp"
              alt="Logo"
              title="Logo"
            />
            <h1 class="text-xl font-bold">PasteBun</h1>
          </a>
          <div class="flex items-center space-x-1">
            <a
              href="https://github.com/vwh/paste-bun"
              target="_blank"
              title="GitHub"
              rel="noopener noreferrer"
              class="bg-gray-700 text-gray-200 p-2 rounded"
            >
              <GithubIcon />
            </a>
            <form action={`/delete/${paste.id}`} method="GET">
              <button
                type="submit"
                title="Delete"
                class="bg-gray-700 text-gray-200 p-2 rounded"
              >
                <DeleteIcon />
              </button>
            </form>
          </div>
        </nav>
        <form
          action={`/edit/${paste.id}`}
          id="check-form"
          method="POST"
          class="flex flex-col flex-grow"
        >
          <div class="flex bg-gray-800">
            <SelectHighlight />
          </div>
          <textarea
            name="content"
            id="content"
            class="flex-grow resize-none p-4 bg-gray-800 border-gray-700 focus:border-gray-600 focus:outline-none text-gray-300"
            placeholder="Start typing here..."
          >
            {paste.content}
          </textarea>
          <button
            type="submit"
            title="Submit"
            class="bg-gray-700 text-gray-200 p-2 w-full text-1xl font-bold"
          >
            Submit
          </button>
        </form>
        <script src="/public/assets/error.js" />
      </body>
    </html>
  );
}
