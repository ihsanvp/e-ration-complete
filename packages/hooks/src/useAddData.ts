import { useMutation, useQueryClient } from '@sveltestack/svelte-query';

interface Config {
  endpoint: string;
  invalidateKeys: string[];
}

export function useAddData<InputDataType, ResultType>(config: Config) {
  const queryClient = useQueryClient();
  return useMutation<ResultType, Error, InputDataType>(
    async (data) => {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        return await response.json();
      } else {
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
