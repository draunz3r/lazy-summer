<script>
	import { tasks } from '$lib/store/tasks';
	import TaskItem from '../TaskItem.svelte';

	let upcomingTasks = $derived.by(() =>
		$tasks
			.filter(
				(/** @type {{ completed: any; dueDate: string | number | Date; }} */ task) =>
					!task.completed && task.dueDate && new Date(task.dueDate) > new Date()
			)
			.sort(
				(
					/** @type {{ dueDate: string | number | Date; }} */ a,
					/** @type {{ dueDate: string | number | Date; }} */ b
				) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
			)
	);
</script>

<div class="w-100">
	{#if upcomingTasks.length > 0}
		<div class="mt-8">
			<h2 class="mb-4 text-sm font-medium text-flo-muted uppercase">Upcoming tasks</h2>
			<ul class="flex flex-col gap-3">
				{#each upcomingTasks as task (task.id)}
					<TaskItem {task} />
				{/each}
			</ul>
		</div>
	{/if}
</div>
