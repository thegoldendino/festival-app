<script lang="ts">
	let { title, subtitle, backButton = false, mapUrl = null } = $props();
</script>

<div class="info-header">
	{#if backButton}
		<button type="button" onclick={() => history.back()}>back</button>
	{/if}

	<div class="right-side">
		<div class="col">
			<h2>{title}</h2>
			<h3>{subtitle}</h3>
		</div>
		{#if mapUrl}
			<button type="button" onclick={() => (window.location.href = mapUrl)}>Map</button>
		{/if}
	</div>
</div>

<style>
	.info-header {
		display: flex;
		justify-content: flex-end;
		padding: 8px 12px;
		background-color: var(--subheader-bg-color);
		height: var(--subheader-height);
	}

	.right-side {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
		align-items: center;
	}

	.col {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	h2 {
		line-height: 32px;
		font-weight: 700;
		font-size: 24px;
	}

	h2,
	h3 {
		margin: 0;
		padding: 0;
	}
</style>
