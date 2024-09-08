import { Html } from "@elysiajs/html";

import AlertIcon from "@/components/icons/alert";
import Head from "@/components/head";

interface ErrorPageProps {
  statsMessage: string;
  errorMessage: string;
}

export default function ErrorPage({
  statsMessage,
  errorMessage,
}: ErrorPageProps) {
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
        </nav>
        <main class="flex-grow flex flex-col items-center justify-center">
          <div class="flex flex-col text-center items-center">
            <AlertIcon />
            <h2 class="text-3xl font-bold mb-2 mt-2">{statsMessage}</h2>
            <p class="text-gray-300 mb-6">{errorMessage}</p>
            <a
              href="/"
              class="bg-gray-700 text-gray-200 py-2 px-4 rounded hover:bg-gray-600 transition-colors"
            >
              Go back home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
