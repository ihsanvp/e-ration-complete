<script>
	import BookingCard from '$lib/components/BookingCard.svelte';
	import InfiniteScrollView from '$lib/components/InfiniteScrollView.svelte';
	import { useInfiniteData } from '@e-ration/hooks';

	const getBookings = useInfiniteData({
		key: 'bookings',
		endpoint: '/api/bookings',
		limit: 10
	});
</script>

<InfiniteScrollView query={getBookings}>
	<svelte:fragment slot="toolbar">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="data" let:data>
		<BookingCard {data} />
	</svelte:fragment>
</InfiniteScrollView>
