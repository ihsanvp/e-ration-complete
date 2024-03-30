import { getOTPClientAuth } from '@e-ration/auth';
import { AuthConfig, type RegisterData } from './config.auth';
import type { IUser } from '@e-ration/database';

export const AuthClient = getOTPClientAuth<IUser, RegisterData>({
	apiRoutes: AuthConfig.apiRoutes,
	firebase: AuthConfig.firebase
});
