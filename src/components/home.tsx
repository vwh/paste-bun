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
      <body class="bg-gray-800 text-gray-100 h-screen flex flex-col">
        <nav class="bg-gray-800 p-4">
          <h1 class="text-xl font-bold">Paste</h1>
        </nav>
        <form action="/" method="POST" class="flex flex-col flex-grow">
          <div class="flex bg-gray-800">
            <select
              name="expiry"
              class="bg-gray-700 w-full border border-gray-600 text-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 appearance-none pr-8"
            >
              <option value="month" selected>
                One Month
              </option>
              <option value="week">One Week</option>
              <option value="day">One Day</option>
            </select>
            <SelectLang />
          </div>
          <textarea
            name="content"
            class="flex-grow resize-none p-4 bg-gray-800 border-gray-700 focus:border-gray-600 focus:outline-none text-gray-300"
            placeholder="Start typing here..."
          />
          <button type="submit" class="bg-gray-700 text-gray-200 p-2 w-full">
            Submit
          </button>
        </form>
      </body>
    </html>
  );
}
