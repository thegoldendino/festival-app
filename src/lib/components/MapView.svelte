<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, DayModel } from '$lib/types.js';
	import { timeRange } from '$lib/utils/dateFormat.js';
	import InfoHeader from './InfoHeader.svelte';
	import AppContainer from './AppContainer.svelte';
	import MapContainer from './MapContainer.svelte';
	import ItemList from './ItemList.svelte';
	import Drawer from './Drawer.svelte';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import StagePinItem from './StagePinItem.svelte';
	import StageIcon from './StageIcon.svelte';
	import ArtistsIcon from './ArtistsIcon.svelte';
	import MapModel from '$lib/models/MapModel.svelte.js';

	let route: RouteModel = getContext('route');
	let festival: FestivalModel = getContext('festival');
	let selectedDay: DayModel = $derived(festival.dayByDate(route.params.date));
	let showStages = $state(false);
	let stages = $derived(selectedDay.stageKeys.map((key) => festival.stage(key)));
	let stageMap = $derived(stages.reduce((acc, stage) => ({ ...acc, [stage.key]: stage }), {}));

	function routeMatches(date: string): boolean {
		return date === route.params.date;
	}

	function routeMissingDate(): boolean {
		return !route.params.date;
	}

	function defaultMatches(date: string): boolean {
		return date === festival.defaultDay.date;
	}

	let locations = $derived(new MapModel(selectedDay, stageMap).locations);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader
			title={selectedDay.display}
			subtitle={timeRange(selectedDay.startTime, selectedDay.endTime)}
			directionsUrl={selectedDay.directionsUrl}
		/>
	{/snippet}

	{#each Object.entries(festival.days) as [date, day]}
		{#if routeMatches(date) || (routeMissingDate() && defaultMatches(date))}
			<MapContainer {locations} />
		{/if}
	{/each}

	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton href={`#/${selectedDay.date}/artists`}>
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
						href={`#/${selectedDay.date}/stages/${key}`}
						name={festival.stage(key).name}
						active={false}
						{idx}
						{key}
					/>
				{/snippet}
			</ItemList>
		</Drawer>
	{/snippet}
</AppContainer>
