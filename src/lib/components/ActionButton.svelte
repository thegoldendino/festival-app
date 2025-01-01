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
		background-color: var(--button-bg-color);
		border-style: solid;
		border-width: 3px;
		border-color: var(--button-border-color);
		border-radius: var(--button-border-radius);
		font-size: 1.25rem;
		font-weight: 600;
		text-decoration: none;
		color: var(--button-text-color);
		text-shadow: var(--button-text-shadow-color) 0 0 10px;
		box-shadow: var(--box-shadow, var(--shadow-4));
		letter-spacing: 0.06rem;
		text-transform: uppercase;
		cursor: pointer;
	}
</style>
