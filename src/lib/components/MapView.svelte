<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, Day } from '$types';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import AppContainer from '$lib/components/AppContainer.svelte';
	import Map from '$lib/components/Map.svelte';
	import { timeRange } from '$utils/dateFormat.js';
	import StageList from './StageList.svelte';

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

<AppContainer openDrawer={showStages}>
	{#snippet infoHeader()}
		<InfoHeader
			title={selectedDay.location}
			subtitle={timeRange(selectedDay.date, selectedDay.startTime, selectedDay.endTime)}
			mapUrl={selectedDay.mapUrl}
		/>
	{/snippet}
	{#each Object.entries(festival.days) as [date, day]}
		{#if routeMatches(date) || (routeMissingDate() && defaultMatches(date))}
			<Map {day} stages={festival.stages} />
		{/if}
	{/each}
	{#snippet footer()}
		<button class="footer-button" type="button" onclick={() => (showStages = true)}>Stages</button>
	{/snippet}

	{#snippet drawer()}
		<StageList date={selectedDay.date} {stages} />
	{/snippet}
</AppContainer>

<style>
	.footer-button {
		width: 100%;
		height: 100%;
		padding: 1rem;
		background-color: transparent;
		border: none;
		font-size: 1.5rem;
	}
</style>
