import { Html } from "@elysiajs/html";

export default function Head() {
  return (
    <>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Paste Bun</title>
      <link href="/public/assets/styles.css" rel="stylesheet" />
      <meta name="msapplication-TileColor" content="#1F2937" />
      <meta name="theme-color" content="#1F2937" />
      <meta name="robots" content="index, follow" />
      <meta
        name="description"
        content="easy-to-use platform for sharing text and code snippets with customizable expiration times and syntax highlighting."
      />
      <meta
        name="keywords"
        content="paste, pastebun, text, code, snippet, share, paste, pastebun, text, code, snippet, share"
      />
      <link rel="icon" href="/public/icons/favicon.ico" type="image/x-icon" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/public/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/public/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/public/icons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/public/icons/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/public/icons/android-chrome-512x512.png"
      />
      <meta property="og:title" content="Paste Bun" />
      <meta property="og:site_name" content="Paste Bun" />
      <meta property="og:locale" content="en_US" />
      <meta
        property="og:description"
        content="easy-to-use platform for sharing text and code snippets with customizable expiration times and syntax highlighting."
      />
      <meta property="og:url" content="http://localhost:3000" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content="Paste Bun" />
      <meta
        name="twitter:description"
        content="easy-to-use platform for sharing text and code snippets with customizable expiration times and syntax highlighting."
      />
      <meta name="author" content="vwh" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
