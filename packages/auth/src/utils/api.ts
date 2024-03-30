import type { GetOTPAuthHandleConfig } from '../otp/otp.server';
import { getSession, sessionSchema, setSession } from './session';
import type { AuthEvent } from './types';
import { text, error, redirect } from '@sveltejs/kit';

export async function handleLoginApiRoute<U, D extends {}>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U, D>
): Promise<Response> {
  const body = await event.request.json();
  const result = sessionSchema.safeParse(body);
  if (result.success) {
    const headers = new Headers();
    headers.append(
      'set-cookie',
      event.cookies.serialize(
        config.cookie.name,
        JSON.stringify(result.data),
        config.cookie.options
      )
    );
    return text('Logged in', {
      headers: headers
    });
  } else {
    throw error(400, result.error);
  }
}

export async function handleLogoutApiRoute<U, D extends {}>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U, D>
): Promise<Response> {
  event.cookies.delete(config.cookie.name, config.cookie.options);
  // @ts-ignore
  event.locals.user = undefined;
  // @ts-ignore
  event.locals.session = undefined;
  return redirect(307, config.apiRoutes.login.path);
}

export async function handleRegisterApiRoute<U, D extends {}>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U, D>
): Promise<Response> {
  const session = getSession(event, config);
  if (!session) {
    return error(401, 'Unauthorized');
  }
  const body = await event.request.json();
  const data = config.apiRoutes.register.schema?.parse(body) as D;
  await config.adapter.createUser(data, session);
  return redirect(307, '/');
}
