<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';
	import { melt } from '@melt-ui/svelte';
	import Icon from '@iconify/svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';

	const queryClient = new QueryClient();
	const items = [
		{
			label: 'Overview',
			icon: 'mage:dashboard-2-fill',
			href: '/app/overview'
		},
		{
			label: 'Items',
			icon: 'mdi:briefcase',
			href: '/app/items'
		},
		{
			label: 'Bookings',
			icon: 'lets-icons:order-fill',
			href: '/app/bookings'
		},
		{
			label: 'Categories',
			icon: 'mage:users-fill',
			href: '/app/categories'
		},
		{
			label: 'Users',
			icon: 'mage:users-fill',
			href: '/app/users'
		}
	];

	$: showBackButton = ($page.data.hasBack as boolean) ?? false;
</script>

<QueryClientProvider client={queryClient}>
	<header
		class="fixed top-0 left-0 right-0 h-16 border-b bg-white flex items-center justify-between px-3 gap-5"
	>
		{#if showBackButton}
			<button
				class="p-1 flex items-center justify-center w-9 h-9 border rounded-md border-gray-300"
				on:click={() => window.history.back()}
			>
				<Icon width={20} icon="material-symbols:arrow-back" />
			</button>
		{:else}
			<Drawer let:trigger {items}>
				<button
					use:melt={trigger}
					class="p-1 flex items-center justify-center w-9 h-9 border rounded-md border-gray-300"
				>
					<Icon width={20} icon="material-symbols:menu" />
				</button>
			</Drawer>
		{/if}
		<div class="flex-1">
			<div class="text-xl font-medium capitalize">{$page.data.title}</div>
		</div>
		<div>
			<a href="/app/settings" class="p-1 flex items-center justify-center w-9 h-9">
				<Icon width={20} icon="material-symbols:settings" />
			</a>
		</div>
	</header>
	<main class="pt-16">
		<slot />
	</main>
</QueryClientProvider>
