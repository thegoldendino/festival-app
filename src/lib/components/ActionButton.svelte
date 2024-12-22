<script>
	let { href = null, onclick = null, children } = $props();
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
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 1rem;
		background-color: transparent;
		border: none;
		font-size: 1.5rem;
		text-decoration: none;
		color: var(--footer-text-color);
	}
</style>
