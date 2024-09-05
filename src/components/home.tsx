import { Html } from "@elysiajs/html";
import SelectLang from "./select-lang";

export default function Home() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paste</title>
      </head>
      <body>
        <main>
          <nav>
            <div>
              <h1>Paste Maker</h1>
            </div>
          </nav>
          <form action="/" method="post">
            <textarea name="content" placeholder="Enter your content here..." />
            <div>
              <SelectLang />
              <select name="expiry">
                <option value="month">One Month</option>
                <option value="week">One Week</option>
                <option value="day">One Day</option>
              </select>
              <input type="submit" value="Create Paste" />
            </div>
          </form>
        </main>
      </body>
    </html>
  );
}
