<script lang="ts">
	import { page } from '$app/stores';
	import { confirmOTP, createCaptcha, resetCaptcha, sendOTP } from '$lib/auth/client.auth';
	import Header from '$lib/components/Header.svelte';
	import SendOtpForm from '$lib/components/SendOTPForm.svelte';
	import VerifyOtpForm from '$lib/components/VerifyOTPForm.svelte';
	import { CAPTCHA_ELEMENT_ID } from '$lib/utils/constants';
	import type { ConfirmationResult, RecaptchaVerifier } from '@e-ration/auth';
	import { onMount } from 'svelte';

	enum LoginView {
		SEND = 'view:send',
		VERIFY = 'view:verify'
	}

	let isSendingOTP = false;
	let isVerifyingOTP = false;
	let view: LoginView = LoginView.SEND;
	let confirmation: ConfirmationResult;
	let captcha: RecaptchaVerifier;

	function changeView(nextView: LoginView) {
		view = nextView;
	}

	function redirectToHome() {
		window.location.href = window.location.href.replace($page.url.pathname, '/');
	}

	async function onSend(e: CustomEvent<string>) {
		try {
			isSendingOTP = true;
			confirmation = await sendOTP(captcha, e.detail);
			changeView(LoginView.VERIFY);
		} catch (err) {
			console.log(err);
			captcha = resetCaptcha(captcha, CAPTCHA_ELEMENT_ID);
		} finally {
			isSendingOTP = false;
		}
	}

	async function onVerify(e: CustomEvent<string>) {
		try {
			isVerifyingOTP = true;
			await confirmOTP(confirmation, e.detail);
			// redirectToHome();
		} catch (err) {
			console.log(err);
		} finally {
			isVerifyingOTP = false;
		}
	}

	onMount(() => {
		captcha = createCaptcha(CAPTCHA_ELEMENT_ID);
	});
</script>

<section class="h-screen flex flex-col">
	<div id={CAPTCHA_ELEMENT_ID}></div>
	<Header />
	<div class="flex-1 flex flex-col items-center justify-center px-10">
		{#if view == LoginView.SEND}
			<SendOtpForm on:send={onSend} loading={isSendingOTP} />
		{:else if view == LoginView.VERIFY}
			<VerifyOtpForm on:verify={onVerify} loading={isVerifyingOTP} />
		{/if}
	</div>
	<div class="h-60"></div>
</section>
