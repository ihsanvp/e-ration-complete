import type { RequestEvent } from '@sveltejs/kit';
import type { AuthConfigType } from './config.auth';
import { z } from 'zod';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';

export const sessionSchema = z.object({
	uid: z.string(),
	phoneNumber: z.string()
});

export type Session = z.infer<typeof sessionSchema>;

export function getSession(event: RequestEvent, config: AuthConfigType): Session | null {
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

export async function createSession(uid: string): Promise<Session> {
	const auth = getFirebaseAdminAuth();
	const user = await auth.getUser(uid);
	return {
		uid,
		phoneNumber: user.phoneNumber!
	};
}
