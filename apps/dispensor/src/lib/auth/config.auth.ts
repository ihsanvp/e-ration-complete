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
	}
};
