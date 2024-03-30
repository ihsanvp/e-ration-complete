import { page } from '$app/stores';
import { getFirebaseAuth } from '$lib/firebase/firebase.client';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { get } from 'svelte/store';

export function createCaptcha(id: string) {
	const auth = getFirebaseAuth();
	return new RecaptchaVerifier(auth, id, {
		size: 'invisible'
	});
}

export function resetCaptcha(captcha: RecaptchaVerifier, id: string) {
	captcha.clear();
	return createCaptcha(id);
}

export async function sendOTP(captcha: RecaptchaVerifier, phoneNumber: string) {
	const auth = getFirebaseAuth();
	const confirmation = await signInWithPhoneNumber(auth, phoneNumber, captcha);
	return confirmation;
}

export async function loginWithOTP(confirmation: ConfirmationResult, otp: string) {
	const result = await confirmation.confirm(otp);
	await fetch('/api/auth/session', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			uid: result.user.uid
		})
	});
	const pageValue = get(page);
	window.location.href = window.location.href.replace(pageValue.url.pathname, '/');
}

export async function logout() {
	await fetch('/api/auth/session', {
		method: 'DELETE'
	});
	const pageValue = get(page);
	window.location.href = window.location.href.replace(pageValue.url.pathname, '/');
}
