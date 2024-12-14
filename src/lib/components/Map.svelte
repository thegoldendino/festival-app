<script lang="ts">
	import type { Day, Stage, Stages } from '$types';
	import { panzoom, type Transform } from '$utils/panzoom.svelte.js';
	import MapModel from '$lib/models/MapModel.svelte.js';
	import type { MapLocation } from '$lib/models/MapModel.svelte.js';

	let { day, stages }: { day: Day; stages: Stages } = $props();

	let map = $derived(new MapModel(day));

	// remove '*' prefix from location.type
	function locationClass(location: MapLocation): string {
		return `${location.type.replace(/^\*/, '')}-pin`;
	}
</script>

{#snippet medicPin(location: MapLocation)}
	{#if location.type === '*medic'}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M4 22q-.825 0-1.412-.587T2 20V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v12q0 .825-.587 1.413T20 22zm6-16h4V4h-4zm1 9v2q0 .425.288.713T12 18t.713-.288T13 17v-2h2q.425 0 .713-.288T16 14t-.288-.712T15 13h-2v-2q0-.425-.288-.712T12 10t-.712.288T11 11v2H9q-.425 0-.712.288T8 14t.288.713T9 15z"
			/></svg
		>
	{/if}
{/snippet}

{#snippet infoPin(location: MapLocation)}
	{#if location.type === '*info'}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
			/></svg
		>
	{/if}
{/snippet}

{#snippet pottyPin(location: MapLocation)}
	{#if location.type === '*potty'}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				d="M5.5 21v-6.5H5q-.425 0-.712-.288T4 13.5V9q0-.825.588-1.412T6 7h3q.825 0 1.413.588T11 9v4.5q0 .425-.288.713T10 14.5h-.5V21q0 .425-.288.713T8.5 22h-2q-.425 0-.712-.288T5.5 21m2-15q-.825 0-1.412-.587T5.5 4t.588-1.412T7.5 2t1.413.588T9.5 4t-.587 1.413T7.5 6M15 21v-5h-1.625q-.5 0-.8-.413t-.125-.912l2.1-6.325q.2-.65.737-1T16.5 7t1.213.35t.737 1l2.1 6.325q.175.5-.125.913t-.8.412H18v5q0 .425-.288.713T17 22h-1q-.425 0-.712-.288T15 21m1.5-15q-.825 0-1.412-.587T14.5 4t.588-1.412T16.5 2t1.413.588T18.5 4t-.587 1.413T16.5 6"
			/></svg
		>
	{/if}
{/snippet}

{#snippet mapPin(location: MapLocation)}
	{#if location.type === '*stage'}
		<a
			class={locationClass(location)}
			style:top="{location.y}px"
			style:left="{location.x}px"
			style:transform={map.locationTransform}
			href="#/{day.date}/stages/{location.key}"
		>
			{location.stageIdx}
		</a>
	{:else}
		<div
			class={locationClass(location)}
			style:top="{location.y}px"
			style:left="{location.x}px"
			style:transform={map.locationTransform}
		>
			{@render medicPin(location)}
			{@render infoPin(location)}
			{@render pottyPin(location)}
		</div>

		<span class="material-icons-round">medical_services</span>
	{/if}
{/snippet}

{#snippet mapBox(map: MapModel)}
	<div class="map-box" style:transform={map.contentTransform}>
		<img class="map-image" width={map.width} height={map.height} src={map.imageUrl} alt="Map" />
		{#each map.locations as location}
			{@render mapPin(location)}
		{/each}
	</div>
{/snippet}

{#if map.imageUrl}
	<div use:panzoom ontransform={(e) => map.ontransform(e.detail)} class="map-view">
		{@render mapBox(map)}
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

	.map-box {
		width: fit-content;
		height: fit-content;
	}

	.stage-pin,
	.potty-pin,
	.info-pin,
	.medic-pin {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--map-pin-text-color);
		text-decoration: none;
		width: 2rem;
		height: 2rem;
	}

	.stage-pin {
		border-radius: 10%;
		box-shadow: var(--shadow-4);
		background-color: var(--map-stage-bg-color);
	}

	.potty-pin,
	.info-pin,
	.medic-pin {
		border-radius: 50%;
	}

	.potty-pin {
		background-color: var(--map-potty-bg-color);
	}
	.info-pin {
		background-color: var(--map-info-bg-color);
	}
	.medic-pin {
		background-color: var(--map-medic-bg-color);
	}
</style>
