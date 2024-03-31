// See https://kit.svelte.dev/docs/types#app

import type { AdminUser } from '$lib/auth/models.auth';
import type { Session } from '$lib/auth/session.auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: Session;
			user?: AdminUser;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
