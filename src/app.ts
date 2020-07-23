import express from 'express';
import bodyParser from 'body-parser';
import { Controller } from './http/controller';
import { Container } from './container';
import { PhraseController } from './http/controllers/phrase';
import { logger } from './logger';
import { NotFoundError } from './errors';
import { errorHandlerMiddleware } from './http/middlewares/error-handle';

export interface AppConfig {
  pensadorURL: string;
  httpPort: number;
}

export class Application {
  constructor(protected config: AppConfig) {}

  protected loadControllers(container: Container): Controller[] {
    return [new PhraseController(container)];
  }

  start() {
    const app = express();

    const { pensadorURL, httpPort } = this.config;
    const container = new Container({
      pensadorIntegrationConfig: {
        baseURL: pensadorURL,
      },
    });
    const router = express.Router({ mergeParams: true });

    this.loadControllers(container).forEach((controller: Controller) =>
      controller.loadRoutes(router)
    );

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(router);

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new NotFoundError());
      }
    );
    app.use(errorHandlerMiddleware);
    app.listen(httpPort, () => {
      logger.info(`Application started on port ${httpPort}`);
    });
  }
}
