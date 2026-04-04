<script>
	import * as chrono from 'chrono-node';
	import { addTask } from '$lib/store/tasks';
	import { tagsStore, addTag } from '$lib/store/tags';
	import { slide } from 'svelte/transition';

	const dateChips = [
		{ label: 'Today', getValue: () => new Date() },
		{
			label: 'Tomorrow',
			getValue: () => {
				const date = new Date();
				date.setDate(date.getDate() + 1);
				return date;
			}
		},
		{
			label: 'Weekend',
			getValue: () => {
				const date = new Date();
				const day = date.getDay();
				const diff = (6 - day) % 7;
				date.setDate(date.getDate() + diff);
				return date;
			}
		},
		{
			label: 'Next week',
			getValue: () => {
				const date = new Date();
				date.setDate(date.getDate() + 7);
				return date;
			}
		}
	];

	let title = $state('');
	let description = $state('');

	// experimental shit!!

	let selectedChip = $state(/** @type {{ label: string, getValue: () => Date } | null} */ (null));
	let dueDate = $derived(selectedChip ? selectedChip.getValue() : null);

	let isExpanded = $state(false);

	// Tag specific config
	let selectedTags = $state(/** @type {string[]} */ ([]));
	let addingTag = $state(false);
	let newTagName = $state('');
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		addTask(title, description, dueDate, selectedTags);
		title = '';
		description = '';
		dueDate = null;
		selectedChip = null;
	}}
	class="mt-6 flex flex-col gap-3"
>
	<div
		class="flex items-center gap-2 rounded-lg
            border border-border-soft bg-bg-surface
            pr-3
            transition-colors duration-200 focus-within:border-border-medium
            "
	>
		<input
			type="text"
			placeholder="Add a task..."
			bind:value={title}
			onkeydown={(e) => {
				if (e.key === 'Enter' && isExpanded) e.preventDefault();
			}}
			class="w-full bg-transparent px-[16px] py-[12px]
           text-flo-primary outline-none
           placeholder:text-flo-faint"
		/>
		<button type="button" onclick={() => (isExpanded = !isExpanded)}>
			{isExpanded ? '↑' : '↓'}
		</button>
	</div>
	<!-- Tag related fields -->
	<div>
		{#each $tagsStore as tag (tag)}
			<button
				class="mt-2 mr-2 rounded px-2 py-1
							font-mono text-sm text-flo-primary
							transition-colors duration-200
							{selectedTags.includes(tag) ? 'bg-accent-strong text-white' : 'hover:bg-bg-subtle'}"
				onclick={(e) => {
					e.preventDefault();
					if (selectedTags.includes(tag)) {
						selectedTags = selectedTags.filter((t) => t !== tag);
					} else {
						selectedTags = [...selectedTags, tag];
					}
				}}>{tag}</button
			>
		{/each}
		<button
			tabindex="-1"
			disabled={addingTag}
			class="ml-2 rounded px-2 py-1
			font-mono text-sm text-flo-primary
			 {addingTag ? 'bg-accent-strong text-white' : 'border border-border-soft hover:bg-bg-subtle'}"
			onclick={(e) => {
				e.preventDefault();
				addingTag = true;
			}}>+ Add Tag</button
		>
		{#if addingTag}
			<small
				><input
					type="text"
					placeholder="Add tag..."
					bind:value={newTagName}
					class="mt-3 bg-bg-surface px-1 py-1 text-xs
           					text-flo-primary outline-none placeholder:text-flo-faint"
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							if (newTagName.trim() !== '') {
								addTag(newTagName);
								selectedTags = [...selectedTags, newTagName];
								newTagName = '';
								addingTag = false;
							}
						} else if (e.key === 'Escape') {
							addingTag = false;
							newTagName = '';
						}
					}}
				/></small
			>
		{/if}
	</div>
	{#if isExpanded}
		<div
			class="flex flex-col overflow-hidden
              rounded-lg border border-border-soft bg-bg-surface"
			transition:slide={{ duration: 200 }}
		>
			<textarea
				rows="2"
				placeholder="Description"
				bind:value={description}
				class="w-full resize-none bg-transparent
             px-[16px] py-[12px]
             font-display text-flo-primary
             outline-none placeholder:text-flo-faint"
			></textarea>
			<div class="border-t border-border-soft px-[16px] py-[8px]">
				{#each dateChips as chip (chip.label)}
					<button
						tabindex="-1"
						class="rounded px-2 py-1
                                font-mono text-sm text-flo-primary transition-colors duration-200
                                {selectedChip && selectedChip.label === chip.label
							? 'bg-accent-strong text-white'
							: 'hover:bg-bg-subtle'}"
						onclick={(e) => {
							e.preventDefault();
							selectedChip = selectedChip?.label === chip.label ? null : chip;
						}}>{chip.label}</button
					>
				{/each}
				<div>
					<small class="ml-2 text-xs text-flo-muted">{dueDate && dueDate.toDateString()}</small>
				</div>
			</div>
		</div>
	{/if}
	{#if title.trim() !== ''}
		<button
			type="submit"
			class="w-full rounded-lg bg-accent-strong
           py-[12px] text-sm font-medium
           text-white transition-colors duration-200
           hover:opacity-90">Add Task</button
		>
	{/if}
</form>
