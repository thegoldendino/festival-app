<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import { getContext } from 'svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let day: Day = $derived(festival.dayByDate(route.params.date));
	let stage: Stage = $derived(day.stages[route.params.stage]);
	let schedule: Schedule = $derived(stage.schedule);
</script>

<AppContainer>
	{#snippet infoHeader()}<p>#todo</p>{/snippet}
	<ul>
		{#each schedule as slot}
			<li><a href={`#/artists/${artist.id}`}>{artist.name}</a></li>
		{/each}
	</ul>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
