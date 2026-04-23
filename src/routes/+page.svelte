<script>
	import Greeting from '$lib/components/Greeting.svelte';
	import AddTask from '$lib/components/AddTask.svelte';
	import TaskItem from '$lib/components/TaskItem.svelte';
	import { tasks } from '$lib/store/tasks';
	import { fade, slide } from 'svelte/transition';
	import { device } from '$lib/store/layout';
	import { activeTab } from '$lib/store/navigation';
	import { ChevronUp } from 'lucide-svelte';

	function getGreeting() {
		const hour = new Date().getHours();
		if (hour < 12) {
			return 'Good morning';
		} else if (hour < 18) {
			return 'Good afternoon';
		} else {
			return 'Good evening';
		}
	}
	let greeting = getGreeting();

	let activeTasks = $derived.by(() =>
		$tasks.filter(
			(/** @type {{ completed: any; }} */ task) =>
				!task.completed && (!task.dueDate || new Date(task.dueDate) <= new Date())
		)
	);
	let completedTasks = $derived.by(() =>
		$tasks.filter((/** @type {{ completed: any; }} */ task) => task.completed)
	);

	let subtitle = $derived.by(() => {
		const activeTasksCount = activeTasks.length;
		return activeTasksCount === 0
			? "Let's start your day!"
			: `You have ${activeTasksCount} tasks for today!`;
	});

	// Show all tasks including the hidden ones when user clicks "show all"
	let showAll = $state(false);

	// Show only what's for today, hide rest active tasks.
	let visibleTasks = $derived(showAll ? activeTasks : activeTasks.slice(0, 5));
	let hiddenCount = $derived(Math.max(0, activeTasks.length - 5));
</script>

<div class="flex h-svh flex-col px-5 pt-4 lg:pt-10">
	<Greeting {greeting} subTitle={subtitle} />

	{#if $activeTab === 'today' || $device !== 'phone'}
		<!-- scrollable task list -->
		<div class="min-h-0 flex-1">
			<div
				class="max-h-5/8 overflow-y-auto"
				in:fade={{ duration: 150, delay: 150 }}
				out:fade={{ duration: 150 }}
			>
				{#each visibleTasks as task (task.id)}
					<TaskItem {task} />
				{/each}
			</div>
			{#if hiddenCount > 0}
				<button
					type="button"
					onclick={() => {
						showAll = true;
						visibleTasks = activeTasks;
						hiddenCount = 0;
					}}
					class="mt-2 px-1 text-xs text-flo-muted
           transition-colors duration-150 hover:text-flo-primary"
				>
					+ {hiddenCount} more
				</button>
			{:else if hiddenCount === 0 && activeTasks.length > 0}
				<button
					type="button"
					onclick={() => {
						showAll = false;
						visibleTasks = activeTasks.slice(0, 5);
						hiddenCount = Math.max(0, activeTasks.length - 5);
					}}
					class="my-2 flex cursor-pointer
           px-1 text-xs text-flo-muted transition-colors duration-150 hover:text-flo-primary"
				>
					<ChevronUp size={16} />
					<span>Collapse</span>
				</button>
			{/if}
			<div class="border-t border-border-soft pt-2 pb-4">
				<AddTask />
			</div>
		</div>
	{:else if $activeTab === 'completed'}
		<div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			{#each completedTasks as task (task.id)}
				<TaskItem {task} />
			{/each}
		</div>
	{:else if $activeTab === 'analytics'}
		<div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			<p class="text-sm text-flo-muted">Analytics coming in Layer 3.</p>
		</div>
	{/if}
</div>
