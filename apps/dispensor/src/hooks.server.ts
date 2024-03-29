import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import { AdapterFirestore } from '$lib/auth/adapter';
import { getOTPAuthHandle } from '@e-ration/auth';

export const handle = getOTPAuthHandle({
	excludeRoutes: [],
	adapter: new AdapterFirestore(FIREBASE_ADMIN_KEY, PUBLIC_FIREBASE_PROJECT_ID),
	apiRoutes: {
		login: '/api/auth/login',
		logout: '/api/auth/logout'
	},
	redirects: {
		notAuthenticated: '/login',
		noUser: '/register'
	},
	cookie: {
		name: 'axv__ses',
		options: {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 24 // 1 day
		}
	}
});
