import { Html } from "@elysiajs/html";

export default function SelectHighlight() {
  const languages = [
    "text",
    "asm6502",
    "aspnet",
    "bash",
    "basic",
    "brainfuck",
    "c",
    "clike",
    "clojure",
    "cmake",
    "cobol",
    "coffeescript",
    "cpp",
    "crystal",
    "csharp",
    "css",
    "csv",
    "cypher",
    "dart",
    "django",
    "docker",
    "editorconfig",
    "elixir",
    "erlang",
    "excel-formula",
    "fortran",
    "gdscript",
    "go",
    "go-module",
    "graphql",
    "groovy",
    "html",
    "haskell",
    "java",
    "javadoc",
    "javadoclike",
    "javascript",
    "jsx",
    "julia",
    "kotlin",
    "lisp",
    "livescript",
    "llvm",
    "log",
    "lua",
    "makefile",
    "markdown",
    "markup",
    "markup-templating",
    "matlab",
    "maxscript",
    "mel",
    "mongodb",
    "monkey",
    "nginx",
    "nix",
    "objectivec",
    "ocaml",
    "odin",
    "php",
    "python",
    "qsharp",
    "r",
    "regex",
    "ruby",
    "sql",
    "swift",
    "toml",
    "tsx",
    "typescript",
    "v",
    "vbnet",
    "wasm",
    "yaml",
    "zig",
  ];

  return (
    <select
      name="highlight"
      id="highlight"
      class="bg-gray-700 w-full border border-gray-600 text-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 appearance-none pr-8"
    >
      {languages.map((lang) => (
        <option>{lang === "plain" ? "TEXT" : lang.toUpperCase()}</option>
      ))}
    </select>
  );
}
