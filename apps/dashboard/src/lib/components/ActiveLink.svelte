<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let href: string;
	export let activeClass: string = '';
	export let onClick: VoidFunction = () => {};

	$: active = $page.url.pathname == href;

	function handleClick() {
		goto(href);
		onClick();
	}
</script>

<button on:click={handleClick} class={`${$$props.class} ${active ? activeClass : ''}`}>
	<slot />
</button>
