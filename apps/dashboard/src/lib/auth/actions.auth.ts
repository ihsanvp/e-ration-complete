import { page } from '$app/stores';
import { getFirebaseAuth } from '$lib/firebase/firebase.client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { get } from 'svelte/store';

export interface LoginData {
	email: string;
	password: string;
}
export async function login(data: LoginData) {
	const auth = getFirebaseAuth();
	const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
	const result = await credentials.user.getIdTokenResult();
	if (!result.claims.admin) {
		throw new Error("User does not have 'admin' access");
	}
	await fetch('/api/auth/session', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			uid: credentials.user.uid
		})
	});
}

export async function logout() {
	await fetch('/api/auth/session', {
		method: 'DELETE'
	});
	const pageValue = get(page);
	window.location.href = window.location.href.replace(pageValue.url.pathname, '/');
}
