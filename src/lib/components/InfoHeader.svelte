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
			<button aria-label="map" type="button" onclick={() => (window.location.href = mapUrl)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"
					/></svg
				>
			</button>
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
