import { Html } from "@elysiajs/html";
import type { Paste } from "@/types";

interface PasteProps {
  paste: Paste;
  deleteToken: string | undefined;
}

export default function Paste({ paste, deleteToken }: PasteProps) {
  return (
    <html lang="en">
      <head>
        <title>Pastes</title>
        <script src="./public/prism.js"></script>
        <link href="./public/prism.css" rel="stylesheet"></link>
      </head>
      <body>
        <h1 safe>Pastes</h1>
        <pre class="rounded grow w-full">
          <code class={`language-${paste.highlight} match-braces line-numbers`}>
            {paste.content}
          </code>
        </pre>
        <p safe>{paste.visitors}</p>
        <p safe>Expire at: {new Date(paste.expire_at).toLocaleString()}</p>
        <p safe>Created at: {new Date(paste.created_at).toLocaleString()}</p>
        <p safe>{deleteToken ? deleteToken : "No delete token"}</p>
      </body>
    </html>
  );
}
