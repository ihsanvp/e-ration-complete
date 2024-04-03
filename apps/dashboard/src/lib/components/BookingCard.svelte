<script lang="ts">
	import type { IBooking } from '@e-ration/database';
	import Icon from '@iconify/svelte';

	export let data: IBooking;

	console.log(data);
</script>

<div class="border border-gray-500 rounded-md overflow-hidden">
	<div class="px-5 py-3 bg-black text-white">#{data.id}</div>
	<div class="px-5 py-5">
		<div class="flex items-center gap-3">
			<Icon width={40} icon="mdi:person" />
			<div class="flex-1">
				<div class="flex items-center justify-between">
					<div class="text-xl font-medium">
						{data.user.name}
					</div>
					<div class="text-gray-600">{data.category.name}</div>
				</div>
				<div class="text-sm text-gray-600">{data.user.phoneNumber}</div>
			</div>
		</div>
		<div class="mt-5 p-5 bg-gray-100 rounded-md flex flex-col gap-3">
			{#each data.items as item}
				<div class="flex items-center justify-between">
					<span class="capitalize font-medium">{item.name}</span>
					<span class="capitalize font-medium">{item.quantity}{item.unit}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
