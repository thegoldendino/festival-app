<script lang="ts">
	import type { Day, Stage } from '$types';
	import { panzoom, type Transform } from '$utils/panzoom.svelte.js';

	let { day }: { day: Day } = $props();

	let transform: Transform = $state({ scale: 1, translation: { x: 0, y: 0 } });

	let ontransform = (e: CustomEvent) => (transform = e.detail);

	let contentTransform = $derived(
		`translate(${transform.translation.x}px, ${transform.translation.y}px) scale(${transform.scale})`
	);
</script>

{#snippet stagePin(stage: Stage, idx: number)}
	<div
		class="map-pin pin-stage"
		style:top="{stage.y}px"
		style:left="{stage.x}px"
		style:transform="scale({1 / transform.scale})"
	>
		{idx}
	</div>
{/snippet}

{#snippet content()}
	<div class="content" style:transform={contentTransform}>
		<img class="map-image" src={day.mapImageUrl} alt="Map" />
		{#each day.stages as stage, idx}
			{@render stagePin(stage, idx)}
		{/each}
	</div>
{/snippet}

{#if day && day.mapImageUrl}
	<div use:panzoom {ontransform} class="map-view">
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
		background-color: rgba(178, 39, 232, 0.5);
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 2rem;
		height: 2rem;
	}

	.map-pin {
		transform-origin: center;
	}
</style>
