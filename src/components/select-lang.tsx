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
      class="block w-full flex-grow sm:w-auto px-3 py-2 text-gray-200 bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      {languages.map((lang) => (
        <option>{lang === "plain" ? "TEXT" : lang.toUpperCase()}</option>
      ))}
    </select>
  );
}
