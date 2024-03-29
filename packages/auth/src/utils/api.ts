import type { GetOTPAuthHandleConfig } from '../otp/otp.server';
import { sessionSchema, setSession } from './session';
import type { AuthEvent } from './types';
import { text, error } from '@sveltejs/kit';

export async function handleLoginApiRoute<U>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U>
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

export async function handleLogoutApiRoute<U>(
  event: AuthEvent,
  config: GetOTPAuthHandleConfig<U>
): Promise<Response> {
  event.cookies.delete(config.cookie.name, config.cookie.options);
  return text('Logged out');
}
