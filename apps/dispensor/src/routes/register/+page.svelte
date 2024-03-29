<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { createDateField, melt } from '@melt-ui/svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let loading = false;
	//   const user = useAuth()

	let name: string;
	let location: string;

	async function updateProfile() {
		//   const data: UserProfile = {
		//       name,
		//       address,
		//       dob: $dob?.toDate("Asia/Calcutta").toISOString()!
		//   }

		try {
			loading = true;
			//   await createUserProfile(user.uid, data)
			window.location.href = window.location.href.replace($page.url.pathname, '/');
		} catch (err) {
			alert(err);
		} finally {
			loading = false;
		}
	}

	$: disabled = name == undefined || location == undefined;
</script>

<section class="flex flex-col">
	<Header />
	<div class="text-2xl text-center p-3">Complete your profile</div>
	<form on:submit|preventDefault={updateProfile}>
		<div class="flex flex-col items-center justify-start px-5 mt-6 gap-5">
			<label class="w-full flex flex-col items-start justify-center" for="profile__name">
				<p>Name</p>
				<input
					bind:value={name}
					id="profile__name"
					required
					class="block w-full h-12 border border-gray-300 overflow-hidden rounded-sm px-5"
					type="text"
				/>
			</label>
			<label class="w-full flex flex-col items-start justify-center" for="profile__address">
				<p>Location</p>
				<input
					bind:value={location}
					id="profile__address"
					required
					class="block w-full h-12 border border-gray-300 overflow-hidden rounded-sm px-5"
					type="text"
				/>
			</label>
		</div>
		<div class="p-5 mt-10">
			<button
				disabled={disabled || loading}
				type="submit"
				class="block w-full bg-black text-white py-3"
				class:btndisabled={disabled || loading}
				on:click={updateProfile}
			>
				{#if loading}
					<Spinner size="1rem" color="white" width="3px" />
				{:else}
					<span>Submit</span>
				{/if}
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
