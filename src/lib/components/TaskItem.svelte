<script>
	import { completeTask } from '$lib/store/tasks';
	import { slide } from 'svelte/transition';
	import { ChevronRight } from 'lucide-svelte';
	import TaskDetails from './TaskDetails.svelte';
	let { task } = $props();
	let detailOpen = $state(false);
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
				detailOpen = !detailOpen;
			}}
			class="ml-auto
			shrink-0
		 text-flo-faint transition-colors duration-150
		 hover:text-flo-muted"
		>
			<ChevronRight size={18} />
		</button>
	</div>

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
		{#if task.dueDate}
			<div class="flex items-center gap-2">
				<small class="font-mono text-xs text-flo-faint">
					{new Date(task.dueDate).toDateString()}
				</small>
			</div>
		{/if}
	</div>

	{#if detailOpen}
		<TaskDetails {task} onClose={() => (detailOpen = false)} />
	{/if}
</div>
