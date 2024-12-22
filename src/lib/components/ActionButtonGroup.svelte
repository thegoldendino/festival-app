<script>
	let { children } = $props();
</script>

<div class="action-button-group">
	{@render children()}
</div>

<style>
	.action-button-group {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.action-button-group :global(.action-button + .action-button) {
		border-left: 1px solid var(--footer-text-color);
		border-right-width: 0;
	}
</style>
