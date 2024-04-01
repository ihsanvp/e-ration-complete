<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { useFetch } from '@e-ration/hooks';
	import type { PageData } from './$types';
	import { logout } from '$lib/auth/actions.auth';
	import Toast from '$lib/components/Toast.svelte';

	export let data: PageData;

	interface Data {
		name: string;
		location: string;
		category: string;
	}

	let toast: Toast;
	let name: string;
	let location: string;
	let category: string;

	const request = useFetch<Data, void, Error>({
		updateSuccess: false,
		onError(err) {
			toast.error(String(err));
		},
		async action(data) {
			await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			window.location.href = window.location.href.replace($page.url.pathname, '/');
		}
	});
</script>

<Toast bind:this={toast} />
<section class="flex flex-col">
	<Header />
	<div class="text-2xl text-center p-3">Complete your profile</div>
	<form on:submit|preventDefault={() => request.start({ name, location, category })}>
		<div class="flex flex-col items-center justify-start px-5 mt-6 gap-5">
			<div class="w-full flex flex-col items-start justify-center">
				<label for="profile__name" class="mb-2">Name</label>
				<input
					bind:value={name}
					name="name"
					id="profile__name"
					required
					class="w-full"
					type="text"
				/>
			</div>
			<div class="w-full flex flex-col items-start justify-center">
				<label for="profile__address" class="mb-2">Location</label>
				<input
					bind:value={location}
					id="profile__address"
					name="location"
					required
					class="w-full"
					type="text"
				/>
			</div>
			<div class="w-full flex flex-col items-start justify-center">
				<label for="profile__category" class="mb-2">Category</label>
				<select bind:value={category} required class="w-full">
					<option disabled selected value>Choose Category</option>
					{#each data.categories as category}
						<option class="capitalize" value={category.id}>{category.name}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="p-5 mt-10">
			<button
				disabled={$request.isLoading}
				type="submit"
				class="w-full bg-black text-white h-12 flex items-center justify-center"
			>
				{#if $request.isLoading}
					<Spinner color="white" width="3px" size="30px" />
				{:else}
					<span>Submit</span>
				{/if}
			</button>
		</div>
	</form>
	<button class="block w-full py-3" on:click={() => logout()}>Cancel</button>
</section>

<style>
	.btndisabled {
		@apply opacity-30;
	}
</style>
