<script>
	let { href = null, onclick = null, children, icon = null } = $props();
</script>

{#if href}
	<a class="action-button" {href}>
		{@render children()}
	</a>
{:else}
	<button class="action-button" type="button" {onclick}>
		{@render children()}
	</button>
{/if}

<style>
	:root {
		/* ActionButton component variables */
		--festapp-action-button-bg: var(--festapp-interactive-bg, var(--festapp-color-secondary-5));
		--festapp-action-button-bg-active: var(--festapp-interactive-bg-hover, var(--festapp-color-secondary-6));
		--festapp-action-button-text: var(--festapp-interactive-text, var(--festapp-color-secondary-1));
		--festapp-action-button-border: var(--festapp-interactive-border, var(--festapp-color-secondary-4));
		--festapp-action-button-text-shadow: var(--festapp-color-secondary-6);
		--festapp-action-button-border-width: var(--festapp-border-width-lg, 3px);
		--festapp-action-button-border-radius: var(--festapp-radius-pill, 30px);
		--festapp-action-button-font-size: var(--festapp-font-size-xl, 1.5rem);
		--festapp-action-button-font-weight: var(--festapp-font-weight-semibold, 600);
		--festapp-action-button-gap: var(--festapp-spacing-sm, 0.75rem);
		--festapp-action-button-padding: var(--festapp-spacing-md, 1rem);
		--festapp-action-button-letter-spacing: 0.06rem;
	}

	.action-button {
		display: flex;
		gap: var(--festapp-action-button-gap);
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--festapp-action-button-bg);
		border-style: solid;
		border-width: var(--festapp-action-button-border-width);
		border-color: var(--festapp-action-button-border);
		border-radius: var(--festapp-action-button-border-radius);
		font-size: var(--festapp-action-button-font-size);
		font-weight: var(--festapp-action-button-font-weight);
		text-decoration: none;
		color: var(--festapp-action-button-text);
		box-shadow: var(--box-shadow, var(--festapp-shadow-4));
		letter-spacing: var(--festapp-action-button-letter-spacing);
		text-transform: uppercase;
		cursor: pointer;
		padding-inline: var(--festapp-action-button-padding);
		max-width: 100%;
		overflow-x: hidden;

		text-shadow:
			-1px -1px 3px var(--festapp-action-button-text-shadow),
			1px -1px 3px var(--festapp-action-button-text-shadow),
			-1px 1px 3px var(--festapp-action-button-text-shadow),
			1px 1px 3px var(--festapp-action-button-text-shadow);
	}

	.action-button:active,
	.action-button:focus {
		background-color: var(--festapp-action-button-bg-active);
	}
</style>