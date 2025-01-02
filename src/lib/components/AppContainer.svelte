<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { FestivalModel } from '$types';
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
	.festival-app {
		display: flex;
		flex-direction: column;
		background-color: var(--festapp-bg-color);
		width: 100%;
		height: 100%;
		inset: 0 0;
		font-family: var(--festapp-font-family);
		container: festival-app / inline-size;
		-webkit-tap-highlight-color: transparent;
	}

	.festival-app :global(*) {
		box-sizing: border-box;
	}

	.responsivefullscreen {
		position: fixed;
	}

	@media (min-width: 600px) {
		.festival-app {
			position: relative;
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
		background-color: var(--festapp-footer-bg-color);
		height: var(--festapp-footer-height);
	}
</style>
