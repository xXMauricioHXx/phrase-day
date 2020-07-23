import {
  PensadorIntegration,
  PensadorIntegrationConfig,
} from './integrations/pensador';
import { PhraseService } from './services/phrase';

export interface ServiceContext {
  pensadorIntegration: PensadorIntegration;
}

export interface ContainerConfig {
  pensadorIntegrationConfig: PensadorIntegrationConfig;
}

export class Container {
  readonly phraseService: PhraseService;
  constructor(config: ContainerConfig) {
    const context: ServiceContext = {
      pensadorIntegration: new PensadorIntegration(
        config.pensadorIntegrationConfig
      ),
    };
    this.phraseService = new PhraseService(context);
  }
}
