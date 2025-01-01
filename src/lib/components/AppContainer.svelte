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

<div class="festival-app">
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
	.festival-app {
		position: fixed;
		inset: 0 0;
		display: flex;
		flex-direction: column;
		background-color: var(--app-bg-color);
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			Open Sans,
			Helvetica Neue,
			sans-serif;
		-webkit-tap-highlight-color: transparent;
	}

	.festival-app :global(*) {
		box-sizing: border-box;
	}

	@media (min-width: 650px) {
		.festival-app {
			position: relative;
			container: festival-app / inline-size;
			width: 100%;
			height: 100%;
		}
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
