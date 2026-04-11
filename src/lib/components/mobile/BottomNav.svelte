<script>
	import { activeTab } from '$lib/store/navigation';
	const tabs = [
		{ id: 'today', label: 'Today' },
		{ id: 'completed', label: 'Completed' },
		{ id: 'analytics', label: 'Analytics' }
	];
</script>

<div
	class="flex w-full flex-row items-center justify-around
            border-t border-border-soft bg-bg-base
            px-2 py-3"
>
	{#each tabs as tab (tab.id)}
		<button
			onclick={() => activeTab.set(tab.id)}
			class="rounded-xl px-4 py-1
             {$activeTab === tab.id
				? 'bg-bg-surface font-medium text-flo-primary'
				: 'text-flo-muted'}"
		>
			{tab.label}
		</button>
	{/each}
</div>
