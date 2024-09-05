import { Html } from "@elysiajs/html";
import SelectLang from "./select-lang";

export default function Home() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paste Maker</title>
        <link href="./public/styles.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-900 text-gray-200 flex flex-col h-screen">
        <nav class="bg-gray-800 p-4">
          <h1 class="text-2xl font-bold text-gray-100">Paste Viewer</h1>
        </nav>
        <main class="flex-grow h-full flex flex-col">
          <form action="/" method="post" class="flex flex-col h-full">
            <div class="flex w-full">
              <SelectLang />
              <select
                name="expiry"
                class="block w-full flex-grow sm:w-auto px-3 py-2 text-gray-200 bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="month">One Month</option>
                <option value="week">One Week</option>
                <option value="day">One Day</option>
              </select>
            </div>
            <textarea
              name="content"
              placeholder="Enter your content"
              class="w-full flex-grow h-full p-4 text-gray-100 bg-gray-800 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 block font-mono"
              style="resize: none; min-height: 0;"
            />
            <input
              type="submit"
              value="Create Paste"
              class="w-full sm:w-auto px-4 py-2 text-gray-100 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
          </form>
        </main>
      </body>
    </html>
  );
}
