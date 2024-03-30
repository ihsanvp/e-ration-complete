<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SendOtpForm from '$lib/components/SendOTPForm.svelte';
	import VerifyOtpForm from '$lib/components/VerifyOTPForm.svelte';
	import { CAPTCHA_ELEMENT_ID } from '$lib/utils/constants';
	import { useFetch } from '@e-ration/hooks';
	import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
	import { onMount } from 'svelte';
	import {
		createCaptcha,
		loginWithOTP,
		resetCaptcha,
		sendOTP,
		type LoginWithOTPData,
		type SendOTPData
	} from '$lib/auth/actions.auth';

	enum LoginView {
		SEND = 'view:send',
		VERIFY = 'view:verify'
	}

	let view: LoginView = LoginView.SEND;
	let confirmation: ConfirmationResult;
	let captcha: RecaptchaVerifier;

	const sendOTPRequest = useFetch<SendOTPData, void, Error>({
		updateSuccess: false,
		action: async (data) => {
			confirmation = await sendOTP(data);
			changeView(LoginView.VERIFY);
		},
		onError: () => {
			captcha = resetCaptcha(captcha, CAPTCHA_ELEMENT_ID);
		}
	});

	const loginRequest = useFetch<LoginWithOTPData, void, Error>({
		updateSuccess: false,
		action: async (data) => {
			await loginWithOTP(data);
		}
	});

	function changeView(nextView: LoginView) {
		view = nextView;
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
			<SendOtpForm
				on:send={(e) => sendOTPRequest.start({ captcha, phoneNumber: e.detail })}
				loading={$sendOTPRequest.isLoading}
			/>
		{:else if view == LoginView.VERIFY}
			<VerifyOtpForm
				on:verify={(e) => loginRequest.start({ confirmation, otp: e.detail })}
				loading={$loginRequest.isLoading}
			/>
		{/if}
	</div>
	<div class="h-60"></div>
</section>
