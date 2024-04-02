<script lang="ts">
	import '../app.pcss';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
</script>

<ProgressBar color="blue" zIndex={100} />
<slot />
