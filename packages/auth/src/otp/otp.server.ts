import { type Handle, redirect, text, error } from '@sveltejs/kit';
import { handleLoginApiRoute, handleLogoutApiRoute, handleRegisterApiRoute } from '../utils/api';
import { getSession, sessionSchema } from '../utils/session';
import { Adapter } from '../utils/adapter';
import type { AuthEvent, AuthUser } from '../utils/types';
import { getFirebaseAuth, type FirebaseConfig, getFirebaseAdminAuth } from '../utils/firebase';
import type { AnyZodObject, ZodObject } from 'zod';

type ApiRoute<D extends {}> = {
  path: string;
  schema?: ZodObject<D>;
};

export interface ApiRoutes<D extends {}> {
  login: ApiRoute<{}>;
  register: ApiRoute<{}>;
  logout: ApiRoute<D>;
}

export interface GetOTPAuthHandleConfig<UserType, UserCreateData extends {}> {
  excludeRoutes: string[];
  adapter: Adapter<UserType, UserCreateData>;
  firebase: FirebaseConfig;
  apiRoutes: ApiRoutes<UserCreateData>;
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

export function getOTPServerAuth<UserType extends AuthUser, UserCreateData extends {}>(
  config: GetOTPAuthHandleConfig<UserType, UserCreateData>
) {
  config.excludeRoutes.push(...Object.values(config.apiRoutes).map((v) => v.path));
  config.excludeRoutes.push(config.redirects.notAuthenticated);
  config.excludeRoutes = Array.from(new Set(config.excludeRoutes));

  const handle: Handle = async ({ event, resolve }) => {
    const isRouteMatch = Object.values(config.apiRoutes)
      .map((v) => v.path)
      .includes(event.url.pathname);
    const isPostRequest = event.request.method == 'POST';
    const isAuthRequest = isRouteMatch && isPostRequest;

    if (isAuthRequest) {
      switch (event.url.pathname) {
        case config.apiRoutes.login.path:
          return await handleLoginApiRoute<UserType, UserCreateData>(event, config);
        case config.apiRoutes.register.path:
          return await handleRegisterApiRoute<UserType, UserCreateData>(event, config);
        case config.apiRoutes.logout.path:
          return await handleLogoutApiRoute<UserType, UserCreateData>(event, config);
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
