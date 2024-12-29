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
		gap: 0.8rem;
		padding: 0.6rem 0.8rem;
	}
</style>
