<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$types';
	import { getContext } from 'svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: Stage = $derived(festival.stages[route.params.key]);
	let schedule: Schedule = $derived(stage.scheduleByDate[route.params.date]);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={stage.name} mapUrl={stage.mapUrl} />{/snippet}
	<ul>
		{#each schedule as slot}
			<li>
				<a class="time-slot" href={`#/${route.params.date}/artists/${slot.key}`}>
					{festival.artists[slot.key]?.name}
				</a>
			</li>
		{/each}
	</ul>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}
	.time-slot {
		display: flex;
		justify-content: space-between;
		border-radius: 50%;
		padding: 8px 12px;
	}
</style>
