<script lang="ts">
	import { fly } from 'svelte/transition';
	let { title, subtitle = null, backButton = false, mapUrl = null } = $props();
</script>

<div class="info-header">
	{#if backButton}
		<div class="left-side">
			<button class="back-button" aria-label="back" type="button" onclick={() => history.back()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="32px"
					viewBox="0 -960 960 960"
					width="32px"
					fill="currentColor"
					><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg
				>
			</button>
		</div>
	{/if}

	<div class="right-side">
		<div class="col" in:fly={{ x: 10, duration: 220, delay: 40 }}>
			<h2>{title}</h2>
			{#if subtitle}
				<h3>{subtitle}</h3>
			{/if}
		</div>
		{#if mapUrl}
			<button
				class="map-button"
				aria-label="map"
				type="button"
				onclick={() => (window.location.href = mapUrl)}
			>
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
		background-color: var(--festapp-subheader-bg-color);
		height: var(--festapp-subheader-height);
		padding-inline: 1rem;
	}

	.left-side {
		display: flex;
		flex: none;
		width: fit-content;
		margin-inline-end: 1rem;
	}

	.right-side {
		flex: 1;
		width: calc(100% - 5rem);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}

	.col {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2px;
		align-items: flex-end;
	}

	h2 {
		width: 100%;
		line-height: 32px;
		font-weight: 600;
		font-size: 24px;
		text-overflow: ellipsis;
		text-align: end;
		overflow: hidden;
		white-space: nowrap;
		letter-spacing: 0.06rem;
	}

	h2,
	h3 {
		margin: 0;
		padding: 0;
		color: var(--festapp-subheader-text-color);
	}

	h3 {
		font-weight: 500;
	}

	.back-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--festapp-button-text-color);
	}

	.map-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60%;
		padding: 0 8px;
		background-color: var(--festapp-button-bg-color);
		border-style: solid;
		border-width: var(--festapp-button-border-width);
		border-color: var(--festapp-button-border-color);
		border-radius: var(--festapp-button-border-radius);
		font-weight: var(--festapp-button-font-weight);
		text-decoration: none;
		color: var(--festapp-button-text-color);
		text-shadow: var(--festapp-button-text-shadow-color) 1px 0 10px;
		box-shadow: var(--box-shadow, var(--shadow-1));
		cursor: pointer;
	}
</style>
