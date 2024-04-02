<script lang="ts">
	import type { CategoryItemJson } from '@e-ration/database';

	type OnClickEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	export let selected: CategoryItemJson[] = [];
	export let items: CategoryItemJson[];

	function onClick(e: OnClickEvent, item: CategoryItemJson) {
		if (e.currentTarget.checked) {
			selected = [...selected, item];
		} else {
			selected = selected.filter((i) => item.id != i.id);
		}
	}
</script>

<div class="py-5 flex flex-col gap-3">
	{#each items as item (item.id)}
		<label
			for={`item__${item.id}`}
			class="grid grid-cols-6 items-center justify-items-start border px-3 py-4 rounded-sm"
		>
			<div class="flex-1 text-xl col-span-4 capitalize">{item.name}</div>
			<div class="text-md">{`${item.quantity}${item.unit}`}</div>
			<div class="flex items-center justify-end w-full h-full py-1">
				<input
					id={`item__${item.id}`}
					class="w-6 h-6 rounded-md item-select__checkbox"
					type="checkbox"
					on:click={(e) => onClick(e, item)}
				/>
			</div>
		</label>
	{/each}
</div>
