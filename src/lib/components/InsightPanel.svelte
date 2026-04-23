<script>
	import CompletedStack from '$lib/components/insightPanelComponents/CompletedStack.svelte';
	import UpcomingStack from '$lib/components/insightPanelComponents/UpcomingStack.svelte';
</script>

<aside class="flex h-[calc(100svh-3rem)] flex-col gap-4 overflow-hidden p-6">
	<CompletedStack />
	<UpcomingStack />
</aside>
