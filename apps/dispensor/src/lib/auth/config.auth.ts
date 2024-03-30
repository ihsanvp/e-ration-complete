import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_MEASUREMENT_ID,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from '$env/static/public';

export const AuthConfig = {
	excludeRoutes: [],
	apiRoutes: {
		login: '/api/auth/login',
		logout: '/api/auth/logout'
	},
	redirects: {
		notAuthenticated: '/login',
		noUser: '/register'
	},
	cookie: {
		name: '__e_ra_sess',
		options: {
			path: '/',
			httpOnly: true,
			sameSite: 'strict' as boolean | 'strict' | 'lax' | 'none' | undefined,
			secure: true,
			maxAge: 60 * 60 * 24 // 1 day
		}
	},
	firebase: {
		apiKey: PUBLIC_FIREBASE_API_KEY,
		authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: PUBLIC_FIREBASE_APP_ID,
		measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
	}
};
