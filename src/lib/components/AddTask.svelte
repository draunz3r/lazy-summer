<script>
	import * as chrono from 'chrono-node';
	import { addTask } from '$lib/store/tasks';
	import { tagsStore, addTag } from '$lib/store/tags';
	import { slide } from 'svelte/transition';
	import { ChevronDown, ChevronUp, Plus } from 'lucide-svelte';
	import Tags from './utils/Tags.svelte';

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
	const addTagsToTask = (/** @type {string} */ tag) => {
		if (selectedTags.includes(tag)) selectedTags = selectedTags.filter((t) => t !== tag);
		else selectedTags = [...selectedTags, tag];
	};
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		addTask(title, description, dueDate, selectedTags);
		title = '';
		description = '';

		selectedChip = null;
		selectedTags = [];
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
			class="w-full bg-transparent px-4 py-3
           text-flo-primary outline-none
           placeholder:text-flo-faint"
		/>
		<button type="button" onclick={() => (isExpanded = !isExpanded)}>
			{#if isExpanded}
				<ChevronUp size={18} />
			{:else}
				<ChevronDown size={18} />
			{/if}
		</button>
	</div>
	<!-- Tag related fields -->
	<div>
		<Tags {selectedTags} {addTagsToTask} />
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
             px-4 py-3
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
           hover:opacity-90"
			><span class="flex flex-row items-center justify-center"><Plus size={18} />Add Task</span
			></button
		>
	{/if}
</form>
