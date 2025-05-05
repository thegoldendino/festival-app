<script lang="ts">
	import { fly } from 'svelte/transition';
	let { title, subtitle = null, backButton = false, mapUrl = null, infoUrl = null } = $props();
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
		<a href={mapUrl || infoUrl} class="titles" in:fly={{ x: 10, duration: 220, delay: 40 }}>
			<h2>{title}</h2>
			{#if subtitle}
				<h3>{subtitle}</h3>
			{/if}
		</a>
		{#if mapUrl}
			<button
				class="map-button"
				aria-label="map"
				type="button"
				onclick={() => (window.location.href = mapUrl)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M8 15h2v-3h3.5v2.5L17 11l-3.5-3.5V10H9q-.425 0-.712.288T8 11zm4 7q-.375 0-.737-.15t-.663-.45l-8-8q-.3-.3-.45-.663T2 12t.15-.737t.45-.663l8-8q.3-.3.663-.45T12 2t.738.15t.662.45l8 8q.3.3.45.663T22 12t-.15.738t-.45.662l-8 8q-.3.3-.663.45T12 22"
					/></svg
				>
			</button>
		{/if}
		{#if infoUrl}
			<button
				class="map-button"
				aria-label="info"
				type="button"
				onclick={() => (window.location.href = infoUrl)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
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
		align-items: center;
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

	.titles {
		display: flex;
		flex-direction: column;
		gap: 2px;
		align-items: flex-end;
		text-decoration: none;
		overflow: hidden;
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
		margin-top: 6px;
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
		padding: 4px 4px;
		background-color: var(--festapp-button-bg-color);
		border-style: solid;
		border-width: var(--festapp-button-border-width);
		border-color: var(--festapp-button-border-color);
		border-radius: var(--festapp-map-button-border-radius);
		font-weight: var(--festapp-button-font-weight);
		text-decoration: none;
		color: var(--festapp-button-text-color);
		text-shadow: var(--festapp-button-text-shadow-color) 1px 0 10px;
		box-shadow: var(--box-shadow, var(--shadow-1));
		cursor: pointer;
	}
</style>
