import { GetOTPAuthHandleConfig } from '../otp/otp.server';
import { AuthEvent } from './types';
import { z } from 'zod';

export const sessionSchema = z.object({
  uid: z.string(),
  token: z.string()
});

export type Session = z.infer<typeof sessionSchema>;

export function getSession<U>(event: AuthEvent, config: GetOTPAuthHandleConfig<U>): Session | null {
  const data = event.cookies.get(config.cookie.name);
  if (!data) {
    return null;
  }
  const result = sessionSchema.safeParse(JSON.parse(data));
  if (!result.success) {
    return null;
  }
  return result.data;
}

export function setSession<U>(event: AuthEvent, config: GetOTPAuthHandleConfig<U>, data: any) {
  const result = sessionSchema.safeParse(data);
  if (result.success) {
    event.cookies.set(config.cookie.name, JSON.stringify(result.data), config.cookie.options);
  } else {
    throw result.error;
  }
}
