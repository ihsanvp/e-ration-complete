<script lang="ts">
	import { logout } from '$lib/auth/actions.auth';
	import { MyCounterButton } from '@repo/ui';

	async function logo() {
		console.log('ookk');
		await logout();
	}
</script>

<h1>Web</h1>
<MyCounterButton />
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={logo}>Logout</button>
