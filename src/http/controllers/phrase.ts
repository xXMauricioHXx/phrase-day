import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '../controller';
import { Container } from '../../container';
import { PhraseService } from '../../container/services/phrase';

export class PhraseController implements Controller {
  protected readonly phraseService: PhraseService;

  constructor(container: Container) {
    this.phraseService = container.phraseService;
  }

  loadRoutes(router: Router) {
    router.get('/phrase', this.getRamdonPhrase.bind(this));
  }

  async getRamdonPhrase(req: Request, res: Response, next: NextFunction) {
    try {
      const phrase = await this.phraseService.getRandomPhrase();
      res.send({ phrase });
    } catch (err) {
      next(err);
    }
  }
}
