<script lang="ts">
	import Icon from '@iconify/svelte';
	import user4Line from '@iconify/icons-mingcute/user-4-line';
	import user4Fill from '@iconify/icons-mingcute/user-4-fill';
	import closeFill from '@iconify/icons-mingcute/close-fill';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { useAuth } from '$lib/auth/contexts.auth';
	import { logout } from '$lib/auth/actions.auth';

	const user = useAuth();

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true
	});

	function onScroll() {
		if ($open) {
			$open = false;
		}
	}
</script>

<svelte:window on:scroll={onScroll} />

<button class="w-full h-full" type="button" use:melt={$trigger}>
	<Icon width={30} height={30} icon={user4Line} />
</button>

{#if $open}
	<div class="menu" use:melt={$content}>
		<div class="absolute right-2 top-2">
			<button class="p-1 bg-gray-200 rounded-sm" type="button" use:melt={$close}>
				<Icon icon={closeFill} />
			</button>
		</div>
		<div class="p-5 flex gap-5">
			<div class="flex items-center justify-center">
				<Icon width={60} height={60} icon={user4Fill} />
			</div>
			<div class="flex-1 flex flex-col items-start justify-center">
				<div class="text-2xl">{user.name}</div>
				<div class="text-sm text-gray-400">
					{user.phoneNumber}
				</div>
			</div>
		</div>
		<div class="p-5">
			<button class="w-full bg-red-500 text-white rounded-sm py-3 px-2" on:click={() => logout()}
				>Logout</button
			>
		</div>
	</div>
{/if}

<style>
	.menu {
		@apply z-10 bg-white border rounded-md;
		width: calc(100vw - 16px);
	}
</style>
