<script lang="ts">
	import type { IUser } from '@e-ration/database';
	import Icon from '@iconify/svelte';

	export let data: IUser;
</script>

<div class="border rounded-md border-gray-400 py-5">
	<div class="flex items-center gap-5 px-5">
		<div class="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
			<Icon width={30} icon="solar:user-bold" />
		</div>
		<div class="flex flex-col">
			<div class="text-lg font-medium capitalize">{data.name}</div>
			<div class="text-xs text-gray-400 capitalize">{data.location}</div>
		</div>
	</div>
	<div class="grid grid-cols-2 divide-x divide-gray-400 mt-5 px-5">
		<div class="flex flex-col px-3 gap-2 col-span-1">
			<div class="text-xs text-gray-400">Category</div>
			<div class="text-md font-medium">{data.category ? data.category.name : 'Nil'}</div>
		</div>
		<div class="flex flex-col px-3 gap-2 col-span-1">
			<div class="text-xs text-gray-400">Mobile Number</div>
			<div class="text-md font-medium">{data.phoneNumber}</div>
		</div>
	</div>
</div>
