<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { device } from '$lib/store/layout';

	import Nav from '$lib/components/Nav.svelte';
	import CompletedStack from '$lib/components/CompletedStack.svelte';

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
			<Nav />
		</nav>
	{/if}

	<main>
		{@render children()}
	</main>

	{#if $device === 'desktop'}
		<aside class="w-auto p-6">
			<CompletedStack />
		</aside>
	{/if}
</div>
