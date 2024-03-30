<script>
	import { createAuthContext } from '$lib/auth/contexts.auth';
	import '../app.pcss';

	/** @type {import('./$types').LayoutData} */
	export let data;

	if (data.user) {
		createAuthContext(data.user);
	}
</script>

<slot />
