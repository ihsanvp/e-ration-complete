import { useQuery } from '@sveltestack/svelte-query';

interface Config {
  key: string;
  endpoint: string;
}

interface BaseResult {
  data: any;
  cursor?: string;
}

export function useCompleteData<ResultType extends BaseResult>(config: Config) {
  return useQuery<void, Error, ResultType>(config.key, async () => {
    const response = await fetch(config.endpoint);
    if (response.ok) {
      return await response.json();
    }
    const message = await response.text();
    throw new Error(message);
  });
}
