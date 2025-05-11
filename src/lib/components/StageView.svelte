<script lang="ts">
	import type {
		FestivalModel,
		RouteModel,
		DayModel,
		Stage,
		Schedule,
		MapLocation
	} from '$lib/types.js';
	import { getContext } from 'svelte';
	import { newDate, shortTime } from '$lib/utils/dateFormat.js';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Drawer from './Drawer.svelte';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import ItemList from './ItemList.svelte';
	import StagePinItem from './StagePinItem.svelte';
	import TimeArtistItem from './TimeArtistItem.svelte';
	import StageIcon from './StageIcon.svelte';
	import ArtistsIcon from './ArtistsIcon.svelte';
	import StageModel from '$lib/models/StageModel.svelte.js';
	import MapContainer from './MapContainer.svelte';
	import MapModel from '$lib/models/MapModel.svelte.js';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: StageModel = $derived(festival.stage(route.params.key));
	let schedule: Schedule = $derived(stage.scheduleByDate(route.params.date) || []);
	let day: DayModel = $derived(festival.dayByDate(route.params.date));
	let stages = $derived(day.stageKeys.map((key) => festival.stage(key)));
	let showStages = $state(false);

	function timeFor(idx: number): string {
		const time = day.timeFor(idx);
		return shortTime(time, idx > 0);
	}

	let stageIdx = $derived(stages.findIndex((s) => s.key === stage.key) + 1);

	let locations: MapLocation[] | undefined = $derived(
		day &&
			day.mapLocations && [
				{
					key: stage.key,
					lat: day.mapLocations[stageIdx][1] || 0,
					lng: day.mapLocations[stageIdx][2] || 0,
					type: '*stage',
					stageIdx: stageIdx,
					href: stage.mapUrl
				}
			]
	);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={`${stageIdx}. ${stage.name}`} mapUrl={stage.mapUrl} backButton />
	{/snippet}

	<div class="content">
		<ItemList keys={schedule.map((s) => s.key)}>
			{#snippet item(key, idx)}
				<TimeArtistItem
					href={key && `#/${day.date}/artists/${key}`}
					name={festival.artists[key]?.name}
					time={timeFor(idx)}
					active={!!key && day.activeFor(idx)}
				/>
			{/snippet}
		</ItemList>
	</div>
	<div class="map">
		{#if locations}
			<MapContainer
				{locations}
				mapOptions={{
					dragging: false, // Disable panning/dragging
					touchZoom: false, // Optional: disable touch zoom
					scrollWheelZoom: false // Optional: disable scroll wheel zoom
				}}
			/>
		{/if}
	</div>

	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton href={`#/${day.date}/artists`}>
				<ArtistsIcon></ArtistsIcon>
				{festival.options.text.artists}
			</ActionButton>
			<ActionButton onclick={() => (showStages = true)}>
				<StageIcon></StageIcon>
				{festival.options.text.stages}
			</ActionButton>
		</ActionButtonGroup>
	{/snippet}

	{#snippet drawer()}
		<Drawer bind:open={showStages}>
			<ItemList keys={stages.map((s) => s.key)}>
				{#snippet item(key, idx)}
					<StagePinItem
						href={`#/${day.date}/stages/${key}`}
						name={festival.stage(key)?.name || ''}
						active={key === stage.key}
						{idx}
						{key}
					/>
				{/snippet}
			</ItemList>
		</Drawer>
	{/snippet}
</AppContainer>

<style>
	.content {
		margin-block: 1rem;
	}

	.content :global(*) {
		color: var(--festapp-stage-schedule-text-color);
	}

	.map {
		width: 100%;
		height: 15rem;
	}
</style>
