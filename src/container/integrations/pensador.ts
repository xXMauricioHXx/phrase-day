import { HttpIntegration } from './http';

export interface PensadorIntegrationConfig {
  baseURL: string;
}

export class PensadorIntegration extends HttpIntegration {
  constructor(config: PensadorIntegrationConfig) {
    const { baseURL } = config;
    super({
      baseURL,
    });
  }

  async getPhrase(page: number): Promise<string> {
    const result = await this.instance.get(`/frases_motivacionais/${page}`);
    return result.data;
  }
}
