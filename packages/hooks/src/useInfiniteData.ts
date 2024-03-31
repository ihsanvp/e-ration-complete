import { useInfiniteQuery } from '@sveltestack/svelte-query';

interface Config {
  key: string;
  limit: number;
  url: string;
}

interface BaseResult {
  data: any;
  cursor?: string;
}

export function useInfiniteData<ResultType extends BaseResult>(config: Config) {
  return useInfiniteQuery<ResultType, Error, ResultType>(
    config.key,
    async ({ pageParam }) => {
      const params = new URLSearchParams();
      params.append('limit', config.limit.toString());
      if (pageParam) {
        params.append('cursor', pageParam);
      }
      const url = `${config.url}?${params.toString()}`;
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(await response.text());
    },
    {
      getNextPageParam: (last) => last.cursor || undefined
    }
  );
}
