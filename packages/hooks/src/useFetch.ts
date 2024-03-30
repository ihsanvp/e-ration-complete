import { writable, readonly, derived } from 'svelte/store';

type Action<T, R> = (arg: T) => Promise<R>;
enum Status {
  idle,
  fetching,
  success,
  error
}
interface UseFetchOptions<T, R, E> {
  action: Action<T, R>;
  onError?: (err: E) => void;
  updateSuccess: boolean;
}

export function useFetch<T, R, E>(opts: UseFetchOptions<T, R, E>) {
  const status = writable<Status>(Status.idle);
  const error = writable<E | null>(null);
  const isIdle = derived(status, ($status) => $status == Status.idle);
  const isLoading = derived(status, ($status) => $status == Status.fetching);
  const isComplete = derived(status, ($status) => $status == Status.success);
  const isFailed = derived(status, ($status) => $status == Status.error);

  async function start(arg: T) {
    status.set(Status.fetching);
    error.set(null);
    try {
      await opts.action(arg);
      if (opts.updateSuccess) {
        status.set(Status.success);
      }
    } catch (err) {
      status.set(Status.error);
      error.set(err as E);
      if (opts.onError) {
        opts.onError(err as E);
      }
    }
  }

  const data = derived(
    [status, error, isIdle, isLoading, isComplete, isFailed],
    ([$status, $error, $isIdle, $isLoading, $isComplete, $isFailed]) => ({
      status: $status,
      error: $error,
      isIdle: $isIdle,
      isLoading: $isLoading,
      isComplete: $isComplete,
      isFailed: $isFailed
    })
  );
  const dataValue = readonly(data);

  return {
    subscribe: dataValue.subscribe,
    start
  };
}
