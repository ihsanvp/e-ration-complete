<script lang="ts">
	import type { IBooking } from '@e-ration/database';
	import Icon from '@iconify/svelte';

	export let data: IBooking;

	function formatedDate() {
		const date = new Date(data.created);
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
	}
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
				</div>
			</div>
		</div>
		<div class="grid grid-cols-4 divide-x mt-5 divide-gray-300">
			<div class="pr-3">
				<div class="text-xs text-gray-500">Category</div>
				<div class="text-base mt-1 font-medium">APl</div>
			</div>
			<div class="col-span-2 px-3">
				<div class="text-xs text-gray-500">Phone No</div>
				<div class="text-base mt-1 font-medium">+911234567890</div>
			</div>
			<div class="pl-3">
				<div class="text-xs text-gray-500">Date</div>
				<div class="text-base mt-1 font-medium">{formatedDate()}</div>
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
