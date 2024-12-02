<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$types';
	import { getContext } from 'svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: Stage = $derived(festival.stages[route.params.key]);
	let schedule: Schedule = $derived(stage.scheduleByDate[route.params.date]);
</script>

<AppContainer>
	{#snippet infoHeader()}<p>#todo</p>{/snippet}
	<ul>
		{#each schedule as slot}
			<li>
				<a href={`#/${route.params.date}/artists/${slot.key}`}>
					{festival.artists[slot.key]?.name}
				</a>
			</li>
		{/each}
	</ul>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
