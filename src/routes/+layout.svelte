<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { device } from '$lib/store/layout';
	import { activeTab } from '$lib/store/navigation';

	import Nav from '$lib/components/Nav.svelte';
	import CompletedStack from '$lib/components/CompletedStack.svelte';
	import BottomNav from '$lib/components/mobile/BottomNav.svelte';
	import { tasks } from '$lib/store/tasks';
	import TaskItem from '$lib/components/TaskItem.svelte';

	let { children } = $props();

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

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div
	class="grid min-h-svh
			grid-cols-1
            grid-rows-[auto_1fr]
            bg-bg-base
			font-body
			sm:grid-cols-[64px_1fr]
			sm:grid-rows-1
			lg:grid-cols-[64px_320px_1fr]
			"
>
	{#if $device !== 'phone'}
		<nav class="min-h-svh border-r border-border-soft bg-bg-surface">
			<Nav />
		</nav>
	{:else}
		<div class="flex items-center px-5 pt-6 pb-1">
			<div
				class="flex h-10 w-10
                items-center justify-center rounded-lg bg-accent"
			>
				<span class="font-display text-sm font-medium text-white">Flō</span>
			</div>
		</div>
	{/if}

	<main>
		{@render children()}
	</main>
	{#if $device === 'phone'}
		<BottomNav />
	{/if}
	{#if $device === 'desktop'}
		<aside class="w-auto p-6">
			<CompletedStack />
			{#if upcomingTasks.length > 0}
				<div class="mt-8 w-5/12">
					<h2 class="mb-4 text-sm font-medium text-flo-muted uppercase">Upcoming tasks</h2>
					<ul class="flex flex-col gap-3">
						{#each upcomingTasks as task (task.id)}
							<TaskItem {task} />
						{/each}
					</ul>
				</div>
			{/if}
		</aside>
	{/if}
</div>
