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

export interface SendOTPData {
	captcha: RecaptchaVerifier;
	phoneNumber: string;
}

export function resetCaptcha(captcha: RecaptchaVerifier, id: string) {
	captcha.clear();
	return createCaptcha(id);
}

export async function sendOTP(data: SendOTPData) {
	const auth = getFirebaseAuth();
	const confirmation = await signInWithPhoneNumber(auth, data.phoneNumber, data.captcha);
	return confirmation;
}

export interface LoginWithOTPData {
	confirmation: ConfirmationResult;
	otp: string;
}

export async function loginWithOTP(data: LoginWithOTPData) {
	const result = await data.confirmation.confirm(data.otp);
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
