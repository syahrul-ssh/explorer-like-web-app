import { Elysia } from "elysia";
import { explorerRoutes } from "./modules/explorer/routes/explorer.route";
import cors from "@elysiajs/cors";

const app = new Elysia()
            .use(cors({
              origin: '*',
              methods: ['GET', 'POST', 'PUT', 'DELETE'],
            }))
            .use(explorerRoutes)
            .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
