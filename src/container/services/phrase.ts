import cheerio from 'cheerio';
import { PensadorIntegration } from '../integrations/pensador';
import { ServiceContext } from '..';

export class PhraseService {
  protected readonly pensadorIntegration: PensadorIntegration;

  constructor(context: ServiceContext) {
    this.pensadorIntegration = context.pensadorIntegration;
  }

  async getRandomPhrase(): Promise<string> {
    const page = this.random(20, 1);
    const content = await this.pensadorIntegration.getPhrase(page);

    const $ = cheerio.load(content);
    const selectedPhrase = this.random($('.frase').toArray().length - 1, 1);
    const phrase = $('.frase').eq(selectedPhrase).text();
    return phrase.replace(/\r?\n|\r/g, '');
  }

  protected random(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
