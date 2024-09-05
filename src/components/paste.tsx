import { Html } from "@elysiajs/html";
import type { Paste as PasteType } from "@/types";

interface PasteProps {
  paste: PasteType;
  deleteToken: string | undefined;
}

export default function Paste({ paste, deleteToken }: PasteProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paste</title>
        <script src="./public/prism.js" />
        <link href="./public/prism.css" rel="stylesheet" />
      </head>
      <body>
        <h1>Paste Viewer</h1>
        <pre>
          <code class={`language-${paste.highlight} match-braces line-numbers`}>
            {paste.content}
          </code>
        </pre>
        <div>
          <div>
            <span>Visitors:</span>
            {paste.visitors}
          </div>
          <div>
            <span>Expire at:</span>
            {new Date(paste.expire_at).toLocaleString()}
          </div>
          <div>
            <span>Created at:</span>
            {new Date(paste.created_at).toLocaleString()}
          </div>
          <div>
            <span>Delete token:</span>
            {deleteToken ? `<span >${deleteToken}</span>` : "No delete token"}
          </div>
        </div>
        <script>Prism.highlightAll();</script>
      </body>
    </html>
  );
}
