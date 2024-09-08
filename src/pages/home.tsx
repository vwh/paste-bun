import { Html } from "@elysiajs/html";

import Head from "@/components/head";
import SelectHighlight from "@/components/select-highlight";
import GithubIcon from "@/components/icons/github";

export default function Home() {
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
          </div>
        </nav>
        <form
          action="/"
          method="POST"
          class="flex flex-col flex-grow"
          id="check-form"
        >
          <div class="flex bg-gray-800">
            <select
              name="expiry"
              id="expiry"
              class="bg-gray-700 w-full border border-gray-600 text-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 appearance-none pr-8"
            >
              <option value="month" selected>
                One Month
              </option>
              <option value="week">One Week</option>
              <option value="day">One Day</option>
              <option value="hour">One Hour</option>
            </select>
            <SelectHighlight />
          </div>
          <textarea
            name="content"
            id="content"
            class="flex-grow resize-none p-4 bg-gray-800 border-gray-700 focus:border-gray-600 focus:outline-none text-gray-300"
            placeholder="Start typing here..."
          />
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
