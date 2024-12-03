<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel } from '$types';
	import AppContainer from '$lib/components/AppContainer.svelte';
	import Map from '$lib/components/Map.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');

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
	{#snippet infoHeader()}<p>#todo</p>{/snippet}
	{#each Object.entries(festival.days) as [date, day]}
		{#if routeMatches(date) || (routeMissingDate() && defaultMatches(date))}
			<Map {day} stages={festival.stages} />
		{/if}
	{/each}
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
