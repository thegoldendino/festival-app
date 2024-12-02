<script lang="ts">
	import type { Day, Stage, Stages } from '$types';
	import { panzoom, type Transform } from '$utils/panzoom.svelte.js';
	import MapModel from '$lib/models/MapModel.svelte.js';

	let { day, stages }: { day: Day; stages: Stages } = $props();

	let map = $derived(new MapModel(day, stages));
</script>

{#snippet stagePin(stage: Stage, idx: number)}
	<a
		class="map-pin pin-stage"
		style:top="{stage.y}px"
		style:left="{stage.x}px"
		style:transform={map.stageTransform}
		href="#/{day.date}/stages/{stage.key}"
	>
		{idx + 1}
	</a>
{/snippet}

{#snippet content()}
	<div class="content" style:transform={map.contentTransform}>
		<img class="map-image" width={map.width} height={map.height} src={map.imageUrl} alt="Map" />
		{#each map.stages as stage, idx}
			{@render stagePin(stage, idx)}
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

	.pin-stage {
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
