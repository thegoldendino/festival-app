<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, Day } from '$types';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import AppContainer from '$lib/components/AppContainer.svelte';
	import Map from '$lib/components/Map.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let selectedDay: Day = $derived(festival.dayByDate(route.params.date));

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
		<InfoHeader title={selectedDay.location} subtitle={'todo'} mapUrl={selectedDay.mapUrl} />
		{#if festival.mapUrl}
			<button type="button" onclick={() => (window.location = selectedDay.mapUrl)}>Map</button>
		{/if}
	{/snippet}
	{#each Object.entries(festival.days) as [date, day]}
		{#if routeMatches(date) || (routeMissingDate() && defaultMatches(date))}
			<Map {day} stages={festival.stages} />
		{/if}
	{/each}
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
