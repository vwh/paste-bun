import { Html } from "@elysiajs/html";

export default function SelectLang() {
  return (
    <select name="highlight">
      <option value="plain">TEXT</option>
      {[
        "html",
        "css",
        "javascript",
        "bash",
        "basic",
        "brainfuck",
        "c",
        "csharp",
        "cpp",
        "clojure",
        "coffeescript",
        "dart",
        "elixir",
        "erlang",
        "fsharp",
        "factor",
        "go",
        "graphql",
        "haskell",
        "java",
        "julia",
        "kotlin",
        "lisp",
        "livescript",
        "lua",
        "markdown",
        "matlab",
        "ocaml",
        "php",
        "phpdoc",
        "python",
        "qsharp",
        "r",
        "regex",
        "ruby",
        "rust",
        "sql",
        "swift",
        "typescript",
        "webassembly",
        "yaml",
        "zig",
      ].map((syntax) => (
        <option value={syntax}>{syntax.toUpperCase()}</option>
      ))}
    </select>
  );
}
