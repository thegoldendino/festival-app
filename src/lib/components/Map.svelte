<script lang="ts">
	import type { Day, Stages } from '$types';
	import { panzoom } from '$utils/panzoom.svelte.js';
	import MapModel from '$lib/models/MapModel.svelte.js';
	import MapPin from './MapPin.svelte';

	let { day }: { day: Day } = $props();

	let map = $derived(new MapModel(day));
</script>

{#snippet mapBox(map: MapModel)}
	<div class="map-box" style:transform={map.contentTransform}>
		<img
			class="map-image"
			width={map.image?.width}
			height={map.image?.height}
			src={map.image?.src}
			alt="Map"
		/>
		{#each map.locations as location}
			{#if location.type === '*stage'}
				<MapPin
					{location}
					locationTransform={map.locationTransform}
					href={`#/${day.date}/stages/${location.key}`}
				></MapPin>
			{:else}
				<MapPin {location} locationTransform={map.locationTransform}></MapPin>
			{/if}
		{/each}
	</div>
{/snippet}

{#if map.image?.src}
	<div use:panzoom ontransform={(e) => map.ontransform(e.detail)} class="map-view">
		{@render mapBox(map)}
	</div>
{:else}
	<p>mapImageSrc undefined</p>
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

	.map-box {
		width: fit-content;
		height: fit-content;
	}
</style>
