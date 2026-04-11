<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { device } from '$lib/store/layout';
	import { activeTab } from '$lib/store/navigation';

	import Nav from '$lib/components/Nav.svelte';
	import CompletedStack from '$lib/components/CompletedStack.svelte';
	import BottomNav from '$lib/components/mobile/BottomNav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div
	class="grid min-h-[100svh]
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
		<nav class="min-h-[100svh] border-r border-border-soft bg-bg-surface">
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
		</aside>
	{/if}
</div>
