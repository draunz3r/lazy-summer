<script>
	import { completeTask, deleteTask } from '$lib/store/tasks';
	import { slide } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { MoreHorizontal } from 'lucide-svelte';
	let { task } = $props();
	let menuOpen = $state(false);

	function handleOutsideClick() {
		if (menuOpen) menuOpen = false;
	}

	onMount(() => {
		document.addEventListener('click', handleOutsideClick);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleOutsideClick);
	});
</script>

<div
	class="mb-2 flex flex-col
            gap-2 rounded border border-border-soft p-4
			{task.completed ? 'bg-bg-subtle' : 'bg-bg-surface'}"
	transition:slide={{ duration: 150 }}
>
	<div
		class="relative flex cursor-pointer flex-row items-center gap-2"
		onclick={(e) => completeTask(task.id)}
		onkeydown={(e) => e.key === 'Enter' && completeTask(task.id)}
		role="button"
		aria-pressed="false"
		tabindex="0"
	>
		<input
			type="checkbox"
			onchange={() => completeTask(task.id)}
			class="h-3 w-3 shrink-0 cursor-pointer rounded-full
			border
         	transition-all duration-200"
			style="accent-color: var(--color-accent-strong);"
			checked={task.completed}
		/>

		<h3
			class="line-clamp-1 font-display text-lg text-flo-primary
			{task.completed ? 'text-flo-muted line-through' : ''}"
			title={task.title}
		>
			{task.title}
		</h3>
		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				menuOpen = !menuOpen;
			}}
			class="shrink-0 text-lg
         text-flo-faint transition-colors duration-150
         hover:text-flo-muted"
		>
			<MoreHorizontal size={18} />
		</button>
		{#if menuOpen}
			<div
				class="absolute top-8 right-0 z-10 min-w-30
            overflow-hidden rounded-lg border
            border-border-soft bg-bg-base"
			>
				<!-- Edit task button -->
				<button
					onclick={(e) => {
						e.stopPropagation();
					}}
					class="w-full px-4 py-2 text-left text-sm
           text-flo-primary transition-colors
           duration-150 hover:bg-bg-subtle"
				>
					Edit
				</button>
				<!-- Delete task button -->
				<button
					onclick={(e) => {
						e.stopPropagation();
						deleteTask(task.id);
					}}
					class="w-full border-t border-border-soft px-4 py-2
           text-left text-sm
           text-danger transition-colors
           duration-150 hover:bg-bg-subtle"
				>
					Delete
				</button>
			</div>
		{/if}
	</div>

	{#if task.description}
		<div class="group relative">
			<p class="line-clamp-2 text-sm text-flo-body">
				{task.description}
			</p>
			<div
				class="absolute top-full left-0 z-10 mt-1
              hidden
              w-48 rounded-md
              bg-flo-primary px-2 py-1 text-xs
              text-white group-hover:block"
			>
				{task.description}
			</div>
		</div>
	{/if}

	<!-- Tags row -->
	{#if task.tags?.length > 0}
		<div class="flex flex-wrap gap-1">
			{#each task.tags as tag (tag)}
				<span
					class="rounded bg-bg-subtle px-2 py-0.5
                     text-xs text-flo-muted"
				>
					{tag}
				</span>
			{/each}
		</div>
	{/if}

	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<small class="font-mono text-xs text-flo-faint">
				{task.dueDate && new Date(task.dueDate).toDateString()}
			</small>
			<!-- {#each task.tags as tag (tag)}
				<span class="rounded bg-bg-subtle px-1 text-xs text-flo-muted">
					{tag}
				</span>
			{/each} -->
		</div>
	</div>
</div>
