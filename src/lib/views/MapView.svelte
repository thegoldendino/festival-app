<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel } from '$types';
	import AppContainer from '$lib/components/AppContainer.svelte';
	import Map from '$lib/components/Map.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
</script>

<AppContainer>
	{#snippet infoHeader()}<p>#todo</p>{/snippet}
	{#each Object.entries(festival.days) as [date, day]}
		{#if date === route.params.date}
			<Map {day} stages={festival.stages} />
		{/if}
	{/each}
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
