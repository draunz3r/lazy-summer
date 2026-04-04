<script>
	import Greeting from '$lib/components/Greeting.svelte';
	import AddTask from '$lib/components/AddTask.svelte';
	import TaskItem from '$lib/components/TaskItem.svelte';
	import { tasks } from '$lib/store/tasks';

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

	let activeTasks = $derived.by(() => $tasks.filter((task) => !task.completed));
	let completedTasks = $derived.by(() => $tasks.filter((task) => task.completed));

	let subtitle = $derived.by(() => {
		const activeTasksCount = activeTasks.length;
		return activeTasksCount === 0
			? "Let's start your day!"
			: `You have ${activeTasksCount} tasks for today!`;
	});
</script>

<div class="px-5 pt-10">
	<Greeting {greeting} subTitle={subtitle} />

	<!-- Active Tasks -->
	{#each activeTasks as task (task.id)}
		<TaskItem {task} />
	{/each}
	<AddTask />

	<!-- Completed Tasks -->
	<!-- {#each completedTasks as task (task.id)}
		<TaskItem {task} />
	{/each} -->
</div>
