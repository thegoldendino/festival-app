<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { getContext } from 'svelte';

	let { infoHeader, children, footer } = $props();
</script>

<div class="app-container">
	<header>
		<Header></Header>
		<div class="info-header">
			{@render infoHeader()}
		</div>
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
		{@render footer()}
	</footer>
</div>

<style>
	.app-container {
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

	.info-header {
		display: flex;
		justify-content: space-between;
		background-color: var(--subheader-bg-color);
		height: var(--subheader-height);
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
