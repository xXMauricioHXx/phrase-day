import { Application } from "./app";
import dotenv from "dotenv";

dotenv.config();

setImmediate(async () => {
  const app = new Application({
    httpPort: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    pensadorURL: process.env.PENSADOR_URL || "https://www.pensador.com/",
  });

  app.start();
});
