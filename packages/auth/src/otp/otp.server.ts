import { type Handle, redirect } from '@sveltejs/kit';
import { handleLoginApiRoute, handleLogoutApiRoute } from '../utils/api';
import { getSession } from '../utils/session';
import { Adapter } from '../utils/adapter';
import type { AuthUser } from '../utils/types';

export interface GetOTPAuthHandleConfig<UserType> {
  excludeRoutes: string[];
  adapter: Adapter<UserType>;
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

export function getOTPAuthHandle<UserType extends AuthUser>(
  config: GetOTPAuthHandleConfig<UserType>
): Handle {
  config.excludeRoutes.push(...Object.values(config.apiRoutes));
  config.excludeRoutes.push(...Object.values(config.redirects));

  return async ({ event, resolve }) => {
    const isRouteMatch = Object.values(config.apiRoutes).includes(event.url.pathname);
    const isPostRequest = event.request.method == 'POST';
    const isAuthRequest = isRouteMatch && isPostRequest;

    if (isAuthRequest) {
      switch (event.url.pathname) {
        case config.apiRoutes.login:
          return handleLoginApiRoute<UserType>(event, config);
        case config.apiRoutes.logout:
          return handleLogoutApiRoute<UserType>(event, config);
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
        throw redirect(307, config.redirects.noUser);
      }
      //@ts-ignore
      event.locals.user = user;
    }

    return resolve(event);
  };
}
