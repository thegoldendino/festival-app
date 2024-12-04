<script lang="ts">
	import type { Day, Stage, Stages } from '$types';
	import { panzoom, type Transform } from '$utils/panzoom.svelte.js';
	import MapModel from '$lib/models/MapModel.svelte.js';
	import type { MapLocation } from '$lib/models/MapModel.svelte.js';

	let { day, stages }: { day: Day; stages: Stages } = $props();

	let map = $derived(new MapModel(day, stages));
</script>

{#snippet stagePin(location: MapLocation, idx: number)}
	{#if location.type === '_stage'}
		<a
			class={location.type}
			style:top="{location.y}px"
			style:left="{location.x}px"
			style:transform={map.locationTransform}
			href="#/{day.date}/stages/{location.key}"
		>
			{location.stageIdx}
		</a>
	{/if}
{/snippet}

{#snippet locationPin(location: MapLocation, idx: number)}
	{#if location.type === '_misc'}
		<div
			class={location.type}
			style:top="{location.y}px"
			style:left="{location.x}px"
			style:transform={map.locationTransform}
		>
			{location.key}
		</div>
	{/if}
{/snippet}

{#snippet content()}
	<div class="content" style:transform={map.contentTransform}>
		<img class="map-image" width={map.width} height={map.height} src={map.imageUrl} alt="Map" />
		{#each map.locations as location, idx}
			{@render stagePin(location, idx)}
			{@render locationPin(location, idx)}
		{/each}
	</div>
{/snippet}

{#if map.imageUrl}
	<div use:panzoom ontransform={(e) => map.ontransform(e.detail)} class="map-view">
		{@render content()}
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

	.content {
		width: fit-content;
		height: fit-content;
	}

	._stage {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--map-stage-bg-color);
		color: var(--map-stage-text-color);
		text-decoration: none;
		border-radius: 5px;
		width: 2rem;
		height: 2rem;
		box-shadow: var(--shadow-4);
	}

	._misc {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--map-stage-bg-color);
		color: var(--map-stage-text-color);
		text-decoration: none;
		border-radius: 5px;
		width: 2rem;
		height: 2rem;
		box-shadow: var(--shadow-4);
	}
</style>
