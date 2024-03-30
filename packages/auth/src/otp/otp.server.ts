import { type Handle, redirect, text, error } from '@sveltejs/kit';
import { handleLoginApiRoute, handleLogoutApiRoute } from '../utils/api';
import { getSession, sessionSchema } from '../utils/session';
import { Adapter } from '../utils/adapter';
import type { AuthEvent, AuthUser } from '../utils/types';
import { getFirebaseAuth, type FirebaseConfig, getFirebaseAdminAuth } from '../utils/firebase';

export interface GetOTPAuthHandleConfig<UserType> {
  excludeRoutes: string[];
  adapter: Adapter<UserType>;
  firebase: FirebaseConfig;
  apiRoutes: {
    login: string;
    logout: string;
  };
  redirects: {
    notAuthenticated: string;
    noUser: string;
  };
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

export function getOTPServerAuth<UserType extends AuthUser>(
  config: GetOTPAuthHandleConfig<UserType>
) {
  config.excludeRoutes.push(...Object.values(config.apiRoutes));
  config.excludeRoutes.push(config.redirects.notAuthenticated);
  config.excludeRoutes = Array.from(new Set(config.excludeRoutes));

  const handle: Handle = async ({ event, resolve }) => {
    const isRouteMatch = Object.values(config.apiRoutes).includes(event.url.pathname);
    const isPostRequest = event.request.method == 'POST';
    const isAuthRequest = isRouteMatch && isPostRequest;

    if (isAuthRequest) {
      switch (event.url.pathname) {
        case config.apiRoutes.login:
          return await handleLoginApiRoute<UserType>(event, config);
        case config.apiRoutes.logout:
          return await handleLogoutApiRoute<UserType>(event, config);
      }
    }
    const isProtectedRequest = !config.excludeRoutes.includes(event.url.pathname);
    if (isProtectedRequest) {
      const session = getSession<UserType>(event, config);
      if (!session) {
        throw redirect(307, config.redirects.notAuthenticated);
      }
      const user = await config.adapter.getUser(session.uid);
      if (!user) {
        if (event.url.pathname != config.redirects.noUser) {
          throw redirect(307, config.redirects.noUser);
        }
      }
      //@ts-ignore
      event.locals.session = session;
    }

    return resolve(event);
  };

  const getServerSession = (event: AuthEvent) => getSession(event, config);

  const getFirebaseUser = async (event: AuthEvent, credential: string) => {
    const session = getSession(event, config);
    if (!session) {
      return null;
    }
    const auth = getFirebaseAdminAuth(credential);
    const user = await auth.getUser(session.uid);
    if (!user) {
      return null;
    }
    return user;
  };

  return {
    handle,
    getServerSession,
    getFirebaseUser
  };
}
