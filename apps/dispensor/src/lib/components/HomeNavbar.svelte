<script lang="ts">
	import AccountMenu from './AccountMenu.svelte';
</script>

<nav
	class="fixed bg-white top-0 left-0 right-0 w-screen overflow-hidden h-16 border-b flex items-center justify-between px-5"
>
	<h3 class="text-2xl font-bold">E Ration</h3>
	<div class="flex items-center justify-center h-full">
		<AccountMenu />
	</div>
</nav>
