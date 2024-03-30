import { getOTPServerAuth } from '@e-ration/auth';
import { AuthConfig, type RegisterData } from './config.auth';
import { AdapterFirestore } from './adapter';
import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import type { IUser } from '@e-ration/database';

export const ServerAuth = getOTPServerAuth<IUser, RegisterData>({
	excludeRoutes: AuthConfig.excludeRoutes,
	adapter: new AdapterFirestore(FIREBASE_ADMIN_KEY, PUBLIC_FIREBASE_PROJECT_ID),
	apiRoutes: AuthConfig.apiRoutes,
	redirects: AuthConfig.redirects,
	cookie: AuthConfig.cookie,
	firebase: AuthConfig.firebase
});
