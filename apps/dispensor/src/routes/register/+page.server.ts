import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { AuthConfig } from '$lib/auth/config.auth.js';
import { getSession } from '$lib/auth/session.auth.js';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin.js';
import { initializeDatabase } from '$lib/utils/db';
import { User, getCategoryRepository, getUserRepository } from '@e-ration/database';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import("./$types").PageLoad} */
export async function load() {
	initializeDatabase();
	const categories = await getCategoryRepository().orderByAscending('created').find();
	return {
		categories: categories.map((c) => c.toJson())
	};
}
