<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import Icon from '@iconify/svelte';
	import { useAddData } from '@e-ration/hooks';
	import Spinner from './Spinner.svelte';
	import type { CategoryItemJson, CategoryJson } from '@e-ration/database';
	import CategoryItemManager from './CategoryItemManager.svelte';

	let categoryItemsManager: CategoryItemManager;
	let name: string;

	interface InputData {
		name: string;
		items: CategoryItemJson[];
	}

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		role: 'alertdialog',
		closeOnOutsideClick: false
	});

	const action = useAddData<InputData, CategoryJson>({
		endpoint: '/api/categories',
		invalidateKeys: ['categories']
	});

	function closeModal() {
		$open = false;
		name = '';
		$action.reset();
	}

	function onSubmit() {
		if (name) {
			$action.mutate({
				name,
				items: categoryItemsManager.getData()
			});
		}
	}
</script>

<button
	class="p-2 flex items-center justify-center border rounded-md bg-black text-white"
	use:melt={$trigger}
>
	<Icon width={25} icon="material-symbols:add" />
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div class="fixed inset-0 z-50 backdrop-blur-sm bg-black/20" use:melt={$overlay} />
		<div
			class="fixed flex flex-col bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-[90vw] z-50 border border-white rounded-md"
			use:melt={$content}
		>
			{#if $action.isLoading}
				<div class="absolute inset-0 z-50 bg-white flex items-center justify-center">
					<Spinner color="black" width="3px" size="40px" />
				</div>
			{:else if $action.isError}
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Error</div>
						<div class="text-center mt-5">{$action.error?.message}</div>
					</div>
					<div class="p-5">
						<button on:click={closeModal} class="bg-black text-white px-10 py-3 text-sm rounded-md"
							>Close</button
						>
					</div>
				</div>
			{:else if $action.isSuccess}
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Success</div>
						<div>New Category ({$action.data?.name}) added</div>
					</div>
					<div class="p-5">
						<button on:click={closeModal} class="bg-black text-white px-10 py-3 text-sm rounded-md"
							>Close</button
						>
					</div>
				</div>
			{/if}
			<h2 use:melt={$title} class="text-xl font-medium p-5 text-center">Create new Category</h2>
			<form class="p-5 flex flex-col gap-5 overflow-y-scroll" on:submit|preventDefault={onSubmit}>
				<label for="add-item__name">
					<p class="mb-2">Name</p>
					<input
						required
						bind:value={name}
						class="w-full rounded-md"
						type="text"
						id="add-item__name"
					/>
				</label>
				<CategoryItemManager bind:this={categoryItemsManager} />
				<div class="grid grid-cols-2 items-center gap-5 mt-5">
					<button class="bg-gray-200 py-3 text-sm rounded-md" type="button" on:click={closeModal}
						>Cancel</button
					>
					<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Create</button>
				</div>
			</form>
		</div>
	{/if}
</div>
