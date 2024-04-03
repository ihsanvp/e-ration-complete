<script>
	import { goto } from '$app/navigation';
	import AddButton from '$lib/components/AddButton.svelte';

	import InfiniteScrollView from '$lib/components/InfiniteScrollView.svelte';
	import UserCard from '$lib/components/UserCard.svelte';
	import { useInfiniteData } from '@e-ration/hooks';

	const getUsers = useInfiniteData({
		key: 'users',
		endpoint: '/api/users',
		limit: 10
	});
</script>

<InfiniteScrollView query={getUsers}>
	<svelte:fragment slot="toolbar">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="data" let:data>
		<UserCard {data} />
	</svelte:fragment>
</InfiniteScrollView>
