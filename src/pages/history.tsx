import { Html } from "@elysiajs/html";
import Head from "@/components/head";
import GithubIcon from "@/components/icons/github";
import { Paste } from "@/types";
import PinIcon from "@/components/icons/pin";
import HomeIcon from "@/components/icons/home";

interface HistoryProps {
  pastes: Paste[];
  currentPage: number;
  totalPages: number;
}

export default function History({
  pastes,
  currentPage,
  totalPages,
}: HistoryProps) {
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
              href="/"
              title="Home"
              class="bg-gray-700 text-gray-200 p-2 rounded"
            >
              <HomeIcon />
            </a>
            <a
              href="https://github.com/vwh/paste-bun"
              target="_blank"
              title="GitHub"
              rel="noopener noreferrer"
              class="bg-gray-700 text-gray-200 p-2 rounded"
            >
              <GithubIcon />
            </a>
          </div>
        </nav>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">Your Pastes</h2>
          {pastes.length === 0 ? (
            <p>No pastes found.</p>
          ) : (
            <>
              {" "}
              <ul>
                {pastes.map((paste) => (
                  <li class="mb-2 bg-gray-900 p-4 rounded">
                    <div class="flex justify-between items-center">
                      <span>
                        {paste.content.slice(0, 30)}
                        {paste.content.length > 30 ? "..." : ""}
                      </span>
                      <a
                        href={`/edit/${paste.id}`}
                        class="bg-gray-700 text-gray-200 p-2 rounded"
                      >
                        <PinIcon />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <div class="flex justify-between mt-4">
                {currentPage > 1 ? (
                  <a
                    href={`?page=${currentPage - 1}`}
                    class="bg-gray-700 text-gray-200 p-2 rounded"
                  >
                    Previous
                  </a>
                ) : (
                  <button
                    type="button"
                    class="bg-gray-700 text-gray-400 p-2 rounded opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Previous
                  </button>
                )}
                {currentPage < totalPages ? (
                  <a
                    href={`?page=${currentPage + 1}`}
                    class="bg-gray-700 text-gray-200 p-2 rounded"
                  >
                    Next
                  </a>
                ) : (
                  <button
                    type="button"
                    class="bg-gray-700 text-gray-400 p-2 rounded opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
