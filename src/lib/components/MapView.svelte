<script lang="ts">
	import type { Day, Stage } from '$types';
	import { panzoom } from '$utils/panzoom.svelte.js';

	let { day, stages }: { day: Day; stages: Stage[] } = $props();

	$inspect('mapstages', stages);
</script>

{#if day.mapImageUrl}
	<div use:panzoom class="map-view">
		<div class="map-elements">
			<div class="map-image-container">
				<img class="map-image" src={day.mapImageUrl} alt="Map" />
			</div>
			{#each stages as stage, idx}
				<div class="pin-stage" style="top: {stage.y}px; left: {stage.x}px;">
					{idx}
				</div>
			{/each}
		</div>
	</div>
{:else}
	<p>mapImageUrl undefined</p>
{/if}

<style>
	.map-view {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		user-select: none;
		touch-action: none;
		background-color: #ccc;
		-webkit-user-select: none; /* disable selection/Copy of UIWebView */
		-webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
	}

	.map-image-container {
		position: absolute;
		width: 100%;
		height: fit-content;
	}

	.map-image {
		width: 100%;
	}

	.pin-stage {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(178, 39, 232, 0.5);
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
