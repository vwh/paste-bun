import { Html } from "@elysiajs/html";
import { formatDistanceToNow } from "date-fns";
import type { Paste as PasteType } from "@/types";

import Head from "@/components/head";
import GithubIcon from "@/components/icons/github";
import DeleteIcon from "@/components/icons/delete";
import FileIcon from "@/components/icons/file";
import PinIcon from "@/components/icons/pin";

interface PasteProps {
  paste: PasteType;
  isOwner: boolean;
}

export default function Paste({ paste, isOwner }: PasteProps) {
  const expiresIn = formatDistanceToNow(new Date(paste.expire_at), {
    addSuffix: true,
  });
  const createdAt = formatDistanceToNow(new Date(paste.created_at), {
    addSuffix: true,
  });
  return (
    <html lang="en">
      <head>
        <Head />
        <script src="/public/assets/prism.js" />
        <link href="/public/assets/prism.css" rel="stylesheet" />
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
            <a
              href={`/raw/${paste.id}`}
              target="_blank"
              title="Raw content"
              rel="noopener noreferrer"
              class="bg-gray-700 text-gray-200 p-2 rounded"
            >
              <FileIcon />
            </a>
            {isOwner && (
              <>
                <form action={`/delete/${paste.id}`} method="GET">
                  <button
                    type="submit"
                    title="Delete"
                    class="bg-gray-700 text-gray-200 p-2 rounded"
                  >
                    <DeleteIcon />
                  </button>
                </form>
                <a
                  href={`/edit/${paste.id}`}
                  title="Edit"
                  class="bg-gray-700 text-gray-200 p-2 rounded"
                >
                  <PinIcon />
                </a>
              </>
            )}
          </div>
        </nav>
        <section class="bg-gray-700 flex flex-col justify-center items-center gap-2 border border-gray-600 text-gray-300 py-2 px-4 leading-tight pr-8">
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-gray-400">Created at:</span>
            <span>{createdAt}</span>
          </div>
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-gray-400">Expire at:</span>
            <span>{expiresIn}</span>
          </div>
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-gray-400">Visitors:</span>
            <span>{paste.visitors}</span>
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
