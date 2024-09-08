import { Html } from "@elysiajs/html";

export default function SelectLang() {
  const languages = [
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
  ];

  return (
    <select
      name="highlight"
      class="bg-gray-700 w-full border border-gray-600 text-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 appearance-none pr-8"
    >
      {languages.map((lang) => (
        <option>{lang === "plain" ? "TEXT" : lang.toUpperCase()}</option>
      ))}
    </select>
  );
}
