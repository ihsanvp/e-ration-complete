import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import { AdapterFirestore } from '$lib/auth/adapter';
import { AuthConfig } from '$lib/auth/config.auth';
import { ServerAuth } from '$lib/auth/server.auth';

export const handle = ServerAuth.handle;
