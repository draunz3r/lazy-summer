<script>
	import { tagsStore, addTag } from '$lib/store/tags';
	import { Plus } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	let { selectedTags, toggleTags } = $props();
	let availableTags = $derived(tagsStore);
	let addingTag = $state(false);
	let newTagName = $state('');

	/**
	 * @param {HTMLInputElement} node
	 */
	function autofocus(node) {
		node.focus();
	}
</script>

<div class="line-clamp-1 flex h-20 flex-wrap gap-1">
	{#if addingTag}
		<input
			type="text"
			placeholder="Add tag..."
			use:autofocus
			bind:value={newTagName}
			class="h-10 rounded bg-bg-subtle
           px-1.5 py-0.5 text-flo-primary
           outline-none placeholder:text-flo-faint"
			transition:slide={{ duration: 500, axis: 'x', easing: cubicOut }}
			onkeydown={(/** @type {{ key: string; preventDefault: () => void; }} */ e) => {
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
			onfocusout={() => {
				addingTag = false;
				newTagName = '';
			}}
		/>
	{/if}
	<button
		type="button"
		tabindex="-1"
		disabled={addingTag}
		class="ml-2 h-10 rounded px-2 py-1
            font-mono text-sm text-flo-primary
             {addingTag
			? 'bg-accent-strong text-white'
			: 'border border-border-soft hover:bg-bg-subtle'}"
		onclick={(e) => {
			e.preventDefault();
			addingTag = true;
		}}><Plus size={14} /></button
	>
	{#each $availableTags as tag (tag)}
		<button
			type="button"
			class="line-clamp-1 h-10 w-auto rounded px-2 py-1
							font-mono text-sm text-flo-primary
							transition-colors duration-200
							{selectedTags.includes(tag) ? 'bg-accent-strong text-white' : 'hover:bg-bg-subtle'}"
			transition:slide={{ duration: 800, axis: 'x', easing: cubicOut }}
			onclick={(e) => {
				e.preventDefault();
				toggleTags(tag);
			}}>{tag}</button
		>
	{/each}
</div>
