<script lang="ts" context="module">
	export interface DrawerItem {
		label: string;
		icon: string;
		href: string;
	}
</script>

<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import ActiveLink from './ActiveLink.svelte';
	import { logout } from '$lib/auth/actions.auth';

	export let items: DrawerItem[];

	const {
		elements: { trigger, overlay, content, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: true
	});
</script>

<slot trigger={$trigger} />
<div class="" use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="fixed left-0 top-0 z-50 h-screen w-full max-w-[350px] bg-white p-3
            shadow-lg focus:outline-none flex flex-col"
			transition:fly={{
				x: -350,
				duration: 300,
				opacity: 1
			}}
		>
			<button
				use:melt={$close}
				aria-label="Close"
				class="absolute right-5 top-5 p-1 h-7 w-7 border rounded-md flex items-center justify-center border-gray-300"
			>
				<Icon width={20} icon="material-symbols:close" />
			</button>
			<div class="text-2xl font-medium px-3 py-2">E Ration Dashboard</div>
			<div class="flex flex-col mt-10 gap-3">
				{#each items as item}
					<ActiveLink
						href={item.href}
						class="flex items-center gap-5 px-5 py-3 rounded-md"
						activeClass="bg-black text-white"
						onClick={() => ($open = false)}
					>
						<Icon width={30} icon={item.icon} />
						<span>{item.label}</span>
					</ActiveLink>
				{/each}
			</div>
			<div class="flex-1"></div>
			<div>
				<button on:click={logout} class="bg-red-500 text-white w-full py-3 rounded-md"
					>Logout</button
				>
			</div>
		</div>
	{/if}
</div>
