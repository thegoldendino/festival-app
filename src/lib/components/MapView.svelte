<script lang="ts">
	import type { Day } from '$types';
	import { panzoom } from '$utils/panzoom.svelte.js';

	let { day }: { day: Day } = $props();
	let options = { maxZoom: 10, friction: 0.9, scale: 1 };
</script>

{#if day.mapImageUrl}
	<div use:panzoom={options} class="map-view">
		<div class="map-elements">
			<div class="map-image-container">
				<img class="map-image" src={day.mapImageUrl} alt="Map" />
			</div>
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
</style>
