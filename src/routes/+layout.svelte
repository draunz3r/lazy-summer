<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { device } from '$lib/store/layout';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div
	class="grid min-h-[100svh] grid-cols-1
            bg-bg-base
            font-body sm:grid-cols-[64px_1fr] lg:grid-cols-[64px_320px_1fr]"
>
	{#if $device !== 'phone'}
		<nav class="min-h-[100svh] border-r border-border-soft bg-bg-surface">
			<!-- NavRail comes later -->
		</nav>
	{/if}

	<main>
		{@render children()}
	</main>

	{#if $device === 'desktop'}
		<aside class="border-l border-border-soft p-6">
			<p class="text-sm text-flo-muted">Insights coming in Layer 3.</p>
		</aside>
	{/if}
</div>
