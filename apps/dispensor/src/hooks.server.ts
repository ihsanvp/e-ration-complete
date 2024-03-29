import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import { AdapterFirestore } from '$lib/auth/adapter';
import { AuthConfig } from '$lib/auth/config.auth';
import { getOTPAuthHandle } from '@e-ration/auth';

export const handle = getOTPAuthHandle({
	excludeRoutes: AuthConfig.excludeRoutes,
	adapter: new AdapterFirestore(FIREBASE_ADMIN_KEY, PUBLIC_FIREBASE_PROJECT_ID),
	apiRoutes: AuthConfig.apiRoutes,
	redirects: AuthConfig.redirects,
	cookie: AuthConfig.cookie
});
