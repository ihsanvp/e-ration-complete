// See https://kit.svelte.dev/docs/types#app

import type { Session } from '$lib/auth/session.auth';
import type { IUser } from '@e-ration/database';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: Session;
			user?: IUser;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
