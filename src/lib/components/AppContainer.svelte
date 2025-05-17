<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { FestivalModel } from '$lib/types.js';
	import { type Snippet } from 'svelte';
	import { getContext } from 'svelte';

	let festival: FestivalModel = getContext('festival');

	let responsivefullscreen = festival.options.responsivefullscreen ?? false;

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

<div class="festival-app" class:responsivefullscreen>
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
	:root {
		/* AppContainer component variables */
		--festapp-app-bg: var(--festapp-bg-color, var(--festapp-color-primary-9));
		--festapp-app-font-family: var(--festapp-font-family, system-ui, sans-serif);
		--festapp-footer-bg: var(--festapp-footer-bg-color, var(--festapp-color-primary-8));
		/* Desktop breakpoint (1024px) - Not used in media queries as CSS vars aren't supported there */
	}

	.festival-app {
		display: flex;
		flex-direction: column;
		background-color: var(--festapp-app-bg);
		width: 100%;
		height: 100%;
		inset: 0 0;
		font-family: var(--festapp-app-font-family);
		container: festival-app / inline-size;
		-webkit-tap-highlight-color: transparent;
	}

	.festival-app :global(*) {
		box-sizing: border-box;
	}

	.responsivefullscreen {
		position: fixed;
	}

	@media (min-width: 1024px) {
		.festival-app {
			position: relative;
		}
	}

	/* Note: CSS variables can't be used directly in media query expressions */

	header,
	footer {
		flex: none;
	}

	main {
		flex: 1;
		overflow-y: auto;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* Internet Explorer and Edge */
	}

	main::-webkit-scrollbar {
		display: none; /* Chrome, Safari, and Opera */
	}

	footer {
		background-color: var(--festapp-footer-bg);
		height: var(--festapp-footer-height);
	}
</style>
