import { Elysia } from "elysia";
import { explorerRoutes } from "./modules/explorer/routes/explorer.route";

const app = new Elysia()
            .use(explorerRoutes)
            .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
