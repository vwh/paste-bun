import { Html } from "@elysiajs/html";
import type { Paste as PasteType } from "@/types";

import GithubIcon from "@/components/icons/github";
import DeleteIcon from "@/components/icons/delete";
import FileIcon from "@/components/icons/file";

interface PasteProps {
  paste: PasteType;
  isOwner: boolean;
}

export default function Paste({ paste, isOwner }: PasteProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PasteOven</title>
        <script src="./public/prism.js" />
        <link href="./public/prism.css" rel="stylesheet" />
        <link href="./public/styles.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-800 text-gray-100 h-screen flex flex-col">
        <nav class="bg-gray-800 p-3 flex items-center justify-between">
          <a href="/">
            <h1 class="text-xl font-bold">PasteOven</h1>
          </a>
          <div class="flex items-center space-x-2">
            <a
              href="https://github.com/vwh/paste-oven"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gray-700 text-gray-200 p-2 rounded"
            >
              <GithubIcon />
            </a>
            <a
              href={`/raw/${paste.id}`}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gray-700 text-gray-200 p-2 rounded"
            >
              <FileIcon />
            </a>
            {isOwner && (
              <form action={`/delete/${paste.id}`} method="GET">
                <button
                  type="submit"
                  class="bg-gray-700 text-gray-200 p-2 rounded"
                >
                  <DeleteIcon />
                </button>
              </form>
            )}
          </div>
        </nav>
        <section class="bg-gray-700 flex flex-col md:flex-row justify-center items-center gap-2 border border-gray-600 text-gray-300 py-2 px-4 leading-tight pr-8">
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-gray-400">Visitors:</span>
            <span>{paste.visitors}</span>
          </div>
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-gray-400">Expire at:</span>
            <span>{new Date(paste.expire_at).toLocaleDateString("en-CA")}</span>
          </div>
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-gray-400">Created at:</span>
            <span>
              {new Date(paste.created_at).toLocaleDateString("en-CA")}
            </span>
          </div>
        </section>
        <pre class="flex-grow overflow-y-auto bg-gray-800 text-gray-100 resize-none p-4 border-gray-700 focus:border-gray-600 focus:outline-none">
          <code safe class={`language-${paste.highlight} match-braces text-sm`}>
            {paste.content}
          </code>
        </pre>
        <script>Prism.highlightAll();</script>
      </body>
    </html>
  );
}
