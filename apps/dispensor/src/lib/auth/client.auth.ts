import { getOTPClientAuth } from '@e-ration/auth';
import { AuthConfig } from './config.auth';
import type { IUser } from '@e-ration/database';

export const AuthClient = getOTPClientAuth<IUser>({
	apiRoutes: AuthConfig.apiRoutes,
	firebase: AuthConfig.firebase
});
