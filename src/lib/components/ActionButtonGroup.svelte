<script>
	let { children } = $props();
</script>

<div class="action-button-group">
	{@render children()}
</div>

<style>
	.action-button-group {
		margin-block-start: 0.5rem;
		height: 5rem;
		display: flex;
		justify-content: var(--justify-content, space-between);
		align-items: center;
		padding: 0.6rem 1rem;
		gap: 0.8rem;
	}
</style>
