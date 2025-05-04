<script lang="ts">
	import type { RouteModel } from '$lib/types.js';
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
	<div class="drawer-content">
		{@render children()}
	</div>
	<div class="drawer-footer">
		<button
			class="drawer-close-button"
			type="button"
			aria-label="Close"
			aria-controls="drawer"
			aria-expanded={open}
			onclick={() => {
				open = false;
			}}
		>
			close
		</button>
	</div>
</dialog>

<style>
	.drawer {
		z-index: 1000;
		position: absolute;
		bottom: 0;
		max-height: calc(100% - var(--festapp-header-height) - var(--festapp-subheader-height));
		width: 100%;
		border: none;
		padding: 0 0 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px 10px 0 0;
		background-color: var(--festapp-drawer-bg-color);
	}

	.drawer {
		animation: drawer-appear 0.1s ease-in forwards;
	}

	@keyframes drawer-appear {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.drawer :global(*) {
		color: var(--festapp-drawer-text-color);
	}

	.drawer-header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 1rem 0 1rem;
	}

	.drawer-content {
		overflow-y: auto;
	}

	.close-button {
		background-color: transparent;
		border: none;
		font-size: 2rem;
		color: var(--festapp-drawer-text-color);
		cursor: pointer;
	}

	.drawer-footer {
		height: var(--festapp-footer-height);
		display: flex;
		justify-content: right;
		align-items: center;
		padding-inline-end: 2.5rem;
	}

	.drawer-close-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		opacity: 0.7;
		padding: 0;
		font-size: 1rem;
		border-bottom: dashed 3px var(--festapp-drawer-underline-color);
	}
</style>
