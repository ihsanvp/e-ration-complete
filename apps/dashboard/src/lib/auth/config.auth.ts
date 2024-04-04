export interface AuthConfigType {
	excludeRoutes: string[];
	cookie: {
		name: string;
		options: {
			path: string;
			httpOnly: boolean;
			sameSite: boolean | 'strict' | 'lax' | 'none' | undefined;
			secure: boolean;
			maxAge: number;
		};
	};
}

export const AuthConfig: AuthConfigType = {
	excludeRoutes: ['/login', '/api/auth/session', '/api/auth/admin'],
	cookie: {
		name: '__e_ra_dash_sess',
		options: {
			path: '/',
			httpOnly: true,
			sameSite: 'strict' as boolean | 'strict' | 'lax' | 'none' | undefined,
			secure: true,
			maxAge: 60 * 60 * 24 // 1 day
		}
	}
};
