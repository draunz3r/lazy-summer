<script>
	import { tasks } from '$lib/store/tasks';
	import { slide } from 'svelte/transition';
	import TaskItem from '../TaskItem.svelte';
	import { cubicOut } from 'svelte/easing';

	let stackState = $state('collapsed');
	let searchQuery = $state('');

	let completedTasks = $derived(
		$tasks.filter((/** @type {{ completed: any; }} */ t) => t.completed)
	);
	let completedVisible = $derived(completedTasks.slice(0, 5));
	let completedHiddenCount = $derived(Math.max(0, completedTasks.length - completedVisible.length));
</script>

<div class="mb-6 w-full">
	<button
		type="button"
		class="relative h-16 w-100 cursor-pointer"
		// onclick={() => (stackState = stackState === 'collapsed' ? 'expanded' : 'collapsed')}
		onmouseenter={() => (stackState = 'expanded')}
		onmouseleave={() => (stackState = 'collapsed')}
	>
		<!-- back cards — decorative depth -->
		{#if stackState === 'collapsed' && completedTasks.length > 0}
			<div
				class="absolute inset-x-0 top-0 h-12 rounded-lg
			  border border-border-soft bg-bg-surface opacity-40"
			></div>
			<div
				class="absolute inset-x-0 top-1.5 h-12 rounded-lg
			  border border-border-soft bg-bg-surface opacity-70"
			></div>
		{/if}
		<!-- front card — the real content -->
		<div
			class="absolute inset-x-0 top-3 flex h-12
			  items-center justify-between rounded-lg
			  border border-border-soft bg-bg-surface px-4"
		>
			<div>
				<p class="text-sm font-medium text-flo-primary">Completed</p>
				<p class="text-xs text-flo-muted">{completedTasks.length} tasks</p>
			</div>
			<span class="text-xs text-flo-faint">▼</span>
		</div>
		<div>
			{#if stackState === 'expanded'}
				<div
					// class="absolute inset-x-0 top-full mt-0 h-auto overflow-y-auto rounded-lg p-2"
					class="relative inset-x-0 top-full mt-2 mt-3 max-h-[40vh] overflow-y-auto rounded-lg"
					transition:slide={{ duration: 500, easing: cubicOut }}
				>
					{#if completedTasks.length === 0}
						<p class="text-sm text-flo-muted">No completed tasks yet.</p>
					{:else}
						{#each completedVisible as task (task.id)}
							<TaskItem {task} />
						{/each}
						{#if completedHiddenCount > 0}
							<p class="text-xs text-flo-muted">
								+{completedHiddenCount} more completed tasks
							</p>
						{/if}
					{/if}
				</div>
			{/if}
		</div>
	</button>
</div>
