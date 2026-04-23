<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { device } from '$lib/store/layout';
	import Nav from '$lib/components/Nav.svelte';
	import BottomNav from '$lib/components/mobile/BottomNav.svelte';
	import InsightPanel from '$lib/components/InsightPanel.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div
	class="grid min-h-svh
            grid-cols-1
            grid-rows-[auto_1fr_auto]
            bg-bg-base font-body
            sm:grid-cols-[64px_1fr]
            sm:grid-rows-1
            lg:grid-cols-[64px_320px_1fr]"
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

	<main class="min-h-0 overflow-y-auto">
		{@render children()}
	</main>
	{#if $device === 'phone'}
		<BottomNav />
	{/if}
	{#if $device === 'desktop'}
		<InsightPanel />
	{/if}
</div>
