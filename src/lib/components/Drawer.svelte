<script lang="ts">
	import type { RouteModel } from '$types';
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	let { children, open = $bindable() } = $props();

	let route: RouteModel = getContext('route');

	// Close the drawer when the route changes
	$effect(() => {
		open = route.params && false;
	});
</script>

<dialog class="drawer" {open}>
	<div class="drawer-header">
		<button class="close-button" type="button" onclick={() => (open = false)}> &equals; </button>
	</div>
	<div class="drawer-content" transition:fly={{ y: 100 }}>
		{@render children()}
	</div>
</dialog>

<style>
	.drawer {
		position: absolute;
		bottom: 0;
		max-height: calc(100% - var(--header-height) - var(--subheader-height));
		width: 100%;
		border: none;
		padding: 0 0 var(--footer-height) 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px 10px 0 0;
		background-color: var(--footer-bg-color);
		color: var(--footer-text-color);
	}

	.drawer-header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 1rem 0 1rem;
		background-color: var(--footer-background-color);
		color: var(--footer-text-color);
	}

	.drawer-content {
		overflow-y: auto;
	}

	.close-button {
		background-color: transparent;
		border: none;
		font-size: 2rem;
		color: var(--footer-text-color);
	}
</style>
