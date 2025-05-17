<script lang="ts">
	let {
		title,
		subtitle = null,
		backButton = false,
		directionsUrl = null,
		infoUrl = null
	} = $props();
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
		<a href={directionsUrl || infoUrl} class="titles animate">
			<h2>{title}</h2>
			{#if subtitle}
				<h3>{subtitle}</h3>
			{/if}
		</a>
		{#if directionsUrl}
			<button
				class="action-button"
				aria-label="map"
				type="button"
				onclick={() => (window.location.href = directionsUrl)}
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
				class="action-button"
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
	:root {
		/* InfoHeader component variables */
		--festapp-info-header-bg: var(--festapp-subheader-bg-color, var(--festapp-color-secondary-7));
		--festapp-info-header-text: var(--festapp-subheader-text-color, var(--festapp-color-secondary-1));
		--festapp-info-header-padding-inline: var(--festapp-spacing-md, 1rem);
		--festapp-info-header-left-margin-inline-end: var(--festapp-spacing-md, 1rem);
		--festapp-info-header-right-gap: var(--festapp-spacing-md, 1rem);
		--festapp-info-header-titles-gap: 2px;
		--festapp-info-header-title-font-size: 24px;
		--festapp-info-header-title-font-weight: var(--festapp-font-weight-semibold, 600);
		--festapp-info-header-title-line-height: 32px;
		--festapp-info-header-title-letter-spacing: 0.06rem;
		--festapp-info-header-subtitle-font-weight: var(--festapp-font-weight-medium, 500);
		--festapp-info-header-animation-duration: var(--festapp-animation-duration-normal, 0.2s);
		--festapp-info-header-animation-timing: var(--festapp-animation-timing-ease-in, ease-in);
		
		/* InfoHeader action buttons */
		--festapp-info-header-button-bg: var(--festapp-interactive-bg, var(--festapp-button-bg-color, var(--festapp-color-secondary-5)));
		--festapp-info-header-button-text: var(--festapp-interactive-text, var(--festapp-button-text-color, var(--festapp-color-secondary-1)));
		--festapp-info-header-button-border: var(--festapp-interactive-border, var(--festapp-button-border-color, var(--festapp-color-secondary-4)));
		--festapp-info-header-button-border-width: var(--festapp-border-width-lg, var(--festapp-button-border-width, 3px));
		--festapp-info-header-button-border-radius: var(--festapp-radius-circle, var(--festapp-map-button-border-radius, 100px));
		--festapp-info-header-button-text-shadow: var(--festapp-button-text-shadow-color, var(--festapp-color-secondary-6));
		--festapp-info-header-button-padding: 4px 4px;
		--festapp-info-header-button-height: 60%;
	}

	.info-header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background-color: var(--festapp-info-header-bg);
		height: var(--festapp-subheader-height);
		padding-inline: var(--festapp-info-header-padding-inline);
	}

	.left-side {
		display: flex;
		flex: none;
		width: fit-content;
		margin-inline-end: var(--festapp-info-header-left-margin-inline-end);
	}

	.right-side {
		flex: 1;
		width: calc(100% - 5rem);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: var(--festapp-info-header-right-gap);
	}

	.titles {
		display: flex;
		flex-direction: column;
		gap: var(--festapp-info-header-titles-gap);
		align-items: flex-end;
		text-decoration: none;
		overflow: hidden;
		transform: translateX(10px);
	}

	.titles.animate {
		animation: fadeInLeft var(--festapp-info-header-animation-duration) var(--festapp-info-header-animation-timing) forwards;
	}

	@keyframes fadeInLeft {
		from {
			opacity: 0;
			transform: translateX(10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	h2 {
		width: 100%;
		line-height: var(--festapp-info-header-title-line-height);
		font-weight: var(--festapp-info-header-title-font-weight);
		font-size: var(--festapp-info-header-title-font-size);
		text-overflow: ellipsis;
		text-align: end;
		overflow: hidden;
		white-space: nowrap;
		letter-spacing: var(--festapp-info-header-title-letter-spacing);
	}

	h2,
	h3 {
		margin: 0;
		padding: 0;
		color: var(--festapp-info-header-text);
		letter-spacing: var(--festapp-info-header-title-letter-spacing);
	}

	h3 {
		font-weight: var(--festapp-info-header-subtitle-font-weight);
	}

	.back-button {
		margin-top: 6px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--festapp-info-header-text);
	}

	.action-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: var(--festapp-info-header-button-height);
		padding: var(--festapp-info-header-button-padding);
		background-color: var(--festapp-info-header-button-bg);
		border-style: solid;
		border-width: var(--festapp-info-header-button-border-width);
		border-color: var(--festapp-info-header-button-border);
		border-radius: var(--festapp-info-header-button-border-radius);
		font-weight: var(--festapp-button-font-weight);
		text-decoration: none;
		color: var(--festapp-info-header-button-text);
		text-shadow: var(--festapp-info-header-button-text-shadow) 1px 0 10px;
		box-shadow: var(--box-shadow, var(--festapp-shadow-1));
		cursor: pointer;
	}
</style>