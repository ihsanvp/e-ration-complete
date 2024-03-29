import { GetOTPAuthHandleConfig } from '../otp/otp.server';
import { sessionSchema, setSession } from './session';
import { AuthEvent } from './types';
import { MaybePromise, text, error } from '@sveltejs/kit';

export async function handleLoginApiRoute<U>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U>
): Promise<Response> {
  const body = await event.request.json();
  try {
    setSession<U>(event, config, body);
    return text('logged In');
  } catch (err) {
    return error(400, err);
  }
}

export async function handleLogoutApiRoute<U>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U>
): Promise<Response> {
  event.cookies.delete(config.cookie.name, config.cookie.options);
  return text('Logged out');
}
