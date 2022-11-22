import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

/**
 * Responsabilidade:
 * - Configurar o servidor express
 */

const app = express();

setupMiddlewares(app);
setupRoutes(app);

export default app;
