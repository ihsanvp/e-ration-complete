import { useQueryClient, useMutation } from '@sveltestack/svelte-query';

interface Config {
  endpoint: string;
  invalidateKeys: string[];
}

export function useDeleteData(config: Config) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>(
    async (id) => {
      const url = `${config.endpoint}/${id}`;
      const response = await fetch(url, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
    },
    {
      onSuccess: () => {
        config.invalidateKeys.forEach((key) => queryClient.invalidateQueries(key));
      }
    }
  );
}
