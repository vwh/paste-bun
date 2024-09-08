import { Html } from "@elysiajs/html";
import type { Paste as PasteType } from "@/types";

interface PasteProps {
  paste: PasteType;
}

export default function Paste({ paste }: PasteProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paste Viewer</title>
        <script src="./public/prism.js" />
        <link href="./public/prism.css" rel="stylesheet" />
        <link href="./public/styles.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
        <nav class="bg-gray-800 p-4">
          <h1 class="text-2xl font-bold text-gray-100">Paste Viewer</h1>
        </nav>
        <div class="text-gray-200">
          <div class="flex items-center">
            <span class="font-semibold text-gray-400 w-24">Visitors:</span>
            <span>{paste.visitors}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-400 w-24">Expire at:</span>
            <span>{new Date(paste.expire_at).toLocaleString()}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-400 w-24">Created at:</span>
            <span>{new Date(paste.created_at).toLocaleString()}</span>
          </div>
        </div>
        <div class="flex-grow flex flex-col overflow-hidden">
          <pre class="flex-grow overflow-y-auto bg-gray-800 text-gray-100">
            <code
              class={`language-${paste.highlight} match-braces line-numbers text-sm`}
            >
              {paste.content}
            </code>
          </pre>
        </div>
        <script>Prism.highlightAll();</script>
      </body>
    </html>
  );
}
