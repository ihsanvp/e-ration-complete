import { RequestEvent } from '@sveltejs/kit';

export type AuthEvent = RequestEvent<Partial<Record<string, string>>, string | null>;

export interface AuthUser {
  id: string;
}
