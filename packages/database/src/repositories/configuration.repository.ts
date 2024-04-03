import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { Configuration } from '../models/configuration';

@CustomRepository(Configuration)
export class ConfigurationRepository extends BaseFirestoreRepository<Configuration> {}

export const getConfigurationRepository = () =>
  getRepository(Configuration) as ConfigurationRepository;
