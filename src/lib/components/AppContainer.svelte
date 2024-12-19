<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { getContext, type Snippet } from 'svelte';

	let {
		infoHeader,
		children,
		footer,
		drawer,
		openDrawer = false
	}: {
		infoHeader: Snippet;
		children: Snippet;
		footer: Snippet;
		drawer?: Snippet;
		openDrawer?: boolean;
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
	<footer>
		{@render footer()}
	</footer>

	{#if drawer}
		<dialog open={openDrawer}>
			{@render drawer()}
		</dialog>
	{/if}
</div>

<style>
	.app-container {
		position: relative;
		container: festival-app / inline-size;
		background-color: #f0f0f0;
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

	dialog {
		position: absolute;
		bottom: 0;
		width: 100%; /* Adjust as needed */
		border: none;
		padding: 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px 10px 0 0;
	}
</style>
