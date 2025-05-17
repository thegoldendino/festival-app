<script lang="ts">
	import type { RouteModel } from '$lib/types.js';
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
	:root {
		/* Drawer component variables */
		--festapp-drawer-bg: var(--festapp-color-primary-7);
		--festapp-drawer-text: var(--festapp-text-primary, var(--festapp-color-primary-1));
		--festapp-drawer-underline: var(--festapp-color-primary-5);
		--festapp-drawer-close-font-size: var(--festapp-font-size-2xl, 2rem);
		--festapp-drawer-close-button-font-size: var(--festapp-font-size-sm, 1rem);
		--festapp-drawer-animation-duration: var(--festapp-animation-duration-fast, 0.1s);
		--festapp-drawer-animation-timing: var(--festapp-animation-timing-ease, ease-in);
		--festapp-drawer-header-padding: var(--festapp-spacing-xs, 0.5rem)
			var(--festapp-spacing-md, 1rem) 0 var(--festapp-spacing-md, 1rem);
		--festapp-drawer-footer-padding-end: var(--festapp-spacing-2xl, 2.5rem);
		--festapp-drawer-close-button-opacity: 0.7;
		--festapp-drawer-close-button-border-width: 3px;
		--festapp-drawer-border-radius: var(--festapp-radius-lg, 10px) var(--festapp-radius-lg, 10px) 0
			0;
		--festapp-drawer-box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		--festapp-drawer-z-index: 1000;
	}

	.drawer {
		z-index: var(--festapp-drawer-z-index);
		position: absolute;
		bottom: 0;
		max-height: calc(100% - var(--festapp-header-height) - var(--festapp-subheader-height));
		width: 100%;
		border: none;
		padding: 0 0 0;
		box-shadow: var(--festapp-drawer-box-shadow);
		border-radius: var(--festapp-drawer-border-radius);
		background-color: var(--festapp-drawer-bg);
	}

	.drawer {
		animation: drawer-appear var(--festapp-drawer-animation-duration)
			var(--festapp-drawer-animation-timing) forwards;
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
		color: var(--festapp-drawer-text);
	}

	.drawer-header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--festapp-drawer-header-padding);
	}

	.drawer-content {
		overflow-y: auto;
	}

	.close-button {
		background-color: transparent;
		border: none;
		font-size: var(--festapp-drawer-close-font-size);
		color: var(--festapp-drawer-text);
		cursor: pointer;
	}

	.drawer-footer {
		height: var(--festapp-footer-height);
		display: flex;
		justify-content: right;
		align-items: center;
		padding-inline-end: var(--festapp-drawer-footer-padding-end);
	}

	.drawer-close-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		opacity: var(--festapp-drawer-close-button-opacity);
		padding: 0;
		font-size: var(--festapp-drawer-close-button-font-size);
		border-bottom: dashed var(--festapp-drawer-close-button-border-width)
			var(--festapp-drawer-underline);
	}
</style>
