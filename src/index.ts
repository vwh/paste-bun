import { createApp } from "./app";

const app = createApp().listen(3000);

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
