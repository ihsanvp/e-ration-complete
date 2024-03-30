import type { IUser } from '@e-ration/database';
import { getContext, hasContext, setContext } from 'svelte';

const AUTH_KEY = 'context__auth';

export function createAuthContext(user: IUser) {
	setContext(AUTH_KEY, user);
}

export function useAuth(): IUser {
	if (!hasContext(AUTH_KEY)) {
		throw new Error(`context not initialized, key: ${AUTH_KEY}`);
	}
	return getContext<IUser>(AUTH_KEY);
}
