<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { getContext, type Snippet } from 'svelte';

	let {
		infoHeader,
		children,
		footer,
		drawer
	}: {
		infoHeader: Snippet;
		children: Snippet;
		footer?: Snippet;
		drawer?: Snippet;
	} = $props();
</script>

<div class="app-container">
	<header>
		<Header></Header>
		{@render infoHeader()}
	</header>
	<main>
		{@render children()}
	</main>
	{#if footer}
		<footer>
			{@render footer?.()}
		</footer>
	{/if}

	{@render drawer?.()}
</div>

<style>
	.app-container {
		position: relative;
		container: festival-app / inline-size;
		background-color: var(--app-bg-color);
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	header,
	footer {
		flex: none;
	}

	main {
		flex: 1;
		overflow-y: auto;
	}

	footer {
		background-color: var(--footer-bg-color);
		height: var(--footer-height);
	}
</style>
