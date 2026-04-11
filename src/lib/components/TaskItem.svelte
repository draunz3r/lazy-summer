<script>
	import { completeTask } from '$lib/store/tasks';
	let { task } = $props();
</script>

<div
	class="mb-2 flex flex-col
            gap-2 rounded border border-border-soft p-4
			{task.completed ? 'bg-bg-subtle' : 'bg-bg-surface'}"
>
	<div class="flex flex-row items-center gap-2">
		<input
			type="checkbox"
			onclick={() => completeTask(task.id)}
			class="h-3 w-3 flex-shrink-0 cursor-pointer rounded-full
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
