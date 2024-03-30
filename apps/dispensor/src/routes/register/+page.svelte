<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { AuthClient } from '$lib/auth/client.auth';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<section class="flex flex-col">
	<Header />
	<div class="text-2xl text-center p-3">Complete your profile</div>
	<form method="post">
		<div class="flex flex-col items-center justify-start px-5 mt-6 gap-5">
			<label class="w-full flex flex-col items-start justify-center" for="profile__name">
				<p>Name</p>
				<input
					name="name"
					id="profile__name"
					required
					class="block w-full h-12 border border-gray-300 overflow-hidden rounded-sm px-5"
					type="text"
				/>
			</label>
			<label class="w-full flex flex-col items-start justify-center" for="profile__address">
				<p>Location</p>
				<input
					id="profile__address"
					name="location"
					required
					class="block w-full h-12 border border-gray-300 overflow-hidden rounded-sm px-5"
					type="text"
				/>
			</label>
		</div>
		<div class="p-5 mt-10">
			<button type="submit" class="block w-full bg-black text-white py-3">
				<span>Submit</span>
			</button>
		</div>
	</form>
	<!-- <button class="block w-full py-3" on:click={() => logout()}>Cancel</button> -->
</section>

<style>
	.btndisabled {
		@apply opacity-30;
	}
</style>
