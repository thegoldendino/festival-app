<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, Day } from '$types';
	import { timeRange } from '$utils/dateFormat.js';
	import InfoHeader from './InfoHeader.svelte';
	import AppContainer from './AppContainer.svelte';
	import Map from './Map.svelte';
	import ItemList from './ItemList.svelte';
	import Drawer from './Drawer.svelte';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import StagePinItem from './StagePinItem.svelte';
	import StageIcon from './StageIcon.svelte';
	import ArtistsIcon from './ArtistsIcon.svelte';

	let route: RouteModel = getContext('route');
	let festival: FestivalModel = getContext('festival');
	let selectedDay: Day = $derived(festival.dayByDate(route.params.date));
	let showStages = $state(false);
	let stages = $derived(selectedDay.stageKeys.map((key) => festival.stages[key]));

	function routeMatches(date: string): boolean {
		return date === route.params.date;
	}

	function routeMissingDate(): boolean {
		return !route.params.date;
	}

	function defaultMatches(date: string): boolean {
		return date === festival.defaultDay.date;
	}
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader
			title={selectedDay.location}
			subtitle={timeRange(selectedDay.date, selectedDay.startTime, selectedDay.endTime)}
			mapUrl={selectedDay.mapUrl}
		/>
	{/snippet}

	{#each Object.entries(festival.days) as [date, day]}
		{#if routeMatches(date) || (routeMissingDate() && defaultMatches(date))}
			<Map {day} />
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
						name={festival.stages[key].name}
						{idx}
						{key}
					/>
				{/snippet}
			</ItemList>
		</Drawer>
	{/snippet}
</AppContainer>
