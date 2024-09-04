import { Html } from "@elysiajs/html";
import SelectLang from "./select-lang";

export default function Home() {
  return (
    <html lang="en">
      <head>
        <title>Pastes</title>
      </head>
      <body>
        <h1>Pastes</h1>
        <form action="/" method="post">
          <input type="text" name="content" />
          <SelectLang />
          <select name="expiry" id="expiry">
            <option value="month">One Month</option>
            <option value="week">One Week</option>
            <option value="day">One Day</option>
          </select>
          <input type="submit" />
        </form>
      </body>
    </html>
  );
}
