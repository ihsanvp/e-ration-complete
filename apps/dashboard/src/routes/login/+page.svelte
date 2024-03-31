<script lang="ts">
	import { page } from '$app/stores';
	import { login } from '$lib/auth/actions.auth';
	import Spinner from '$lib/components/Spinner.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { useFetch } from '@e-ration/hooks';
	import { FirebaseError } from 'firebase/app';

	let email: string;
	let password: string;
	let toast: Toast;

	const loginRequest = useFetch<any, void, Error>({
		action: async () => {
			await login({
				email,
				password
			});
			window.location.href = window.location.href.replace($page.url.pathname, '/');
		},
		onError: (err) => {
			if (err instanceof FirebaseError) {
				if (err.code == 'auth/invalid-credential') {
					return toast.error('Incorrect credentials');
				}
				return toast.error(err.message);
			}
			toast.error(String(err));
		},
		updateSuccess: false
	});
</script>

<Toast bind:this={toast} />
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" on:submit|preventDefault={loginRequest.start}>
			<div>
				<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
				<div class="mt-2">
					<input
						bind:value={email}
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
						>Password</label
					>
				</div>
				<div class="mt-2">
					<input
						bind:value={password}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full h-12 items-center justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
				>
					{#if $loginRequest.isLoading}
						<Spinner color="white" size="20px" width="2px" />
					{:else}
						<span>Sign in</span>
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
