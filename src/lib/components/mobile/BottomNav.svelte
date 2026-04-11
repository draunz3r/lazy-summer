<script>
	import { activeTab } from '$lib/store/navigation';
	import { CheckSquare, BarChart2 } from 'lucide-svelte';
	import { Home } from 'lucide-svelte';
	const tabs = [
		{ id: 'today', label: 'Today', icon: Home },
		{ id: 'completed', label: 'Done', icon: CheckSquare },
		{ id: 'analytics', label: 'Insights', icon: BarChart2 }
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
			class="flex flex-col items-center gap-1 rounded-xl px-4 py-1
             {$activeTab === tab.id
				? 'bg-bg-surface font-medium text-flo-primary'
				: 'text-flo-muted'}"
		>
			<tab.icon size={20} />
			<span class="text-micro font-medium">{tab.label}</span>
		</button>
	{/each}
</div>
