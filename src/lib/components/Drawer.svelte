<script lang="ts">
	import type { RouteModel } from '$types';
	import { getContext } from 'svelte';

	let { children, open = $bindable() } = $props();

	let route: RouteModel = getContext('route');

	// Close the drawer when the route changes
	$effect(() => {
		open = route.params && false;
	});
</script>

<dialog class="drawer" {open}>
	<div class="drawer-header">
		<button class="close-button" type="button" onclick={() => (open = false)}> &times; </button>
	</div>
	{@render children()}
</dialog>

<style>
	.drawer {
		position: absolute;
		bottom: 0;
		width: 100%; /* Adjust as needed */
		border: none;
		padding: 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px 10px 0 0;
		background-color: var(--footer-bg-color);
		color: var(--footer-text-color);
	}

	.drawer-header {
		display: flex;
		justify-content: end;
		align-items: center;
		padding: 1rem;
		background-color: var(--footer-background-color);
		color: var(--footer-text-color);
	}

	.close-button {
		background-color: transparent;
		border: none;
		font-size: 2rem;
		color: var(--footer-text-color);
	}
</style>
