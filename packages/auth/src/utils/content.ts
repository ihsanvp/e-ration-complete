import { getContext, hasContext, setContext } from 'svelte';

const AUTH_CONTEXT_KEY = 'context__auth';

export function createAuthContext<U>() {
  function set<U>(user: U) {
    setContext(AUTH_CONTEXT_KEY, user);
  }

  function use() {
    if (hasContext(AUTH_CONTEXT_KEY)) {
      return getContext<U>(AUTH_CONTEXT_KEY);
    } else {
      throw new Error(`context not initialized, key: ${AUTH_CONTEXT_KEY}`);
    }
  }
}
