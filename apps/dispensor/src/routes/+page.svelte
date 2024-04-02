<script lang="ts">
	import HomeNavbar from '$lib/components/HomeNavbar.svelte';
	import Icon from '@iconify/svelte';
	import user3Fill from '@iconify/icons-mingcute/user-3-fill';
	import type { PageData } from './$types';
	import { useAuth } from '$lib/auth/contexts.auth';
	import SelectItems from '$lib/components/SelectItems.svelte';
	import type { CategoryItemJson } from '@e-ration/database';
	import BookingDialog from '$lib/components/BookingDialog.svelte';
	import { logout } from '$lib/auth/actions.auth';

	export let data: PageData;
	let selected: CategoryItemJson[] = [];

	const user = useAuth();
</script>

<HomeNavbar />
<section class="pt-16 pb-24 px-5">
	<div class="p-5 mt-10 mb-5 flex flex-col items-center justify-center bg-gray-100 rounded-sm">
		<Icon width={50} height={50} icon={user3Fill} />
		<div class="text-2xl mt-5">{user.name}</div>
	</div>
	{#if data.items.length}
		<SelectItems items={data.items} bind:selected />
	{:else}
		<div class="h-60 flex items-center justify-center flex-col">
			<Icon width={100} class="text-gray-300" icon="mingcute:warning-line" />
			<div class="text-center text-gray-500">You have no items for booking</div>
		</div>
	{/if}
</section>
{#if data.items.length}
	<footer class="fixed bottom-0 left-0 right-0 border-t h-24 px-5 flex items-center justify-center">
		<BookingDialog on:exit={() => logout()} items={selected} category={data.category} />
	</footer>
{/if}
