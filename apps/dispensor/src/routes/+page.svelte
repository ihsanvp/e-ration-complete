<script lang="ts">
	import { AuthClient } from '$lib/auth/client.auth';
	import { MyCounterButton } from '@repo/ui';

	async function logo() {
		console.log('ookk');
		// await AuthClient.logout();
	}
</script>

<h1>Web</h1>
<MyCounterButton />
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={logo}>Logout</button>
