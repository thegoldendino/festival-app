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
	.action-button {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--festapp-button-bg-color);
		border-style: solid;
		border-width: var(--festapp-button-border-width);
		border-color: var(--festapp-button-border-color);
		border-radius: var(--festapp-button-border-radius);
		font-size: var(--festapp-button-font-size);
		font-weight: var(--festapp-button-font-weight);
		text-decoration: none;
		color: var(--festapp-button-text-color);
		text-shadow: var(--festapp-button-text-shadow-color) 0 0 10px;
		box-shadow: var(--box-shadow, var(--shadow-4));
		letter-spacing: 0.06rem;
		text-transform: uppercase;
		cursor: pointer;
		padding-inline: 1rem;
	}
</style>
