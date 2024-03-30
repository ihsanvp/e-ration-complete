<script>
	import { AuthClient } from '$lib/auth/client.auth';
	import '../app.pcss';

	/** @type {import('./$types').LayoutData} */
	export let data;

	if (data.user) {
		AuthClient.createAuthContext(data.user);
	}
	if (data.session) {
		AuthClient.createSessionContext(data.session);
	}
</script>

<slot />
