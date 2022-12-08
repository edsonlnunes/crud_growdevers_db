import { pgHelper } from "../app/shared/database/pg-helper";
import { redisHelper } from "../app/shared/database/redis-helper";
import app from "./config/app";

/**
 * Responsabilidade:
 * - Iniciar o banco de dados
 * - Iniciar o servidor express
 */

pgHelper
  .connect()
  .then(() => {
    redisHelper.connect();

    app.listen(process.env.PORT || 8080, () => console.log("API RODANDO"));
  })
  .catch((err) => console.log(err));
