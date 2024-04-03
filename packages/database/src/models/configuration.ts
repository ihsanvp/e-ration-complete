import { Collection } from 'fireorm';

export interface IConfiguration {
  id: string;
  value: boolean;
}

@Collection()
export class Configuration {
  id!: string;
  value!: boolean;

  toJson(): IConfiguration {
    return {
      id: this.id,
      value: this.value
    };
  }

  static fromJson(data: IConfiguration): Configuration {
    const config = new Configuration();
    config.id = data.id;
    config.value = data.value;
    return config;
  }
}
