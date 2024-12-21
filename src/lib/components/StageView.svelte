<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$types';
	import { getContext } from 'svelte';
	import { newDate, shortTime } from '$utils/dateFormat.js';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: Stage = $derived(festival.stages[route.params.key]);
	let schedule: Schedule = $derived(stage.scheduleByDate[route.params.date]);
	let day: Day = $derived(festival.days[route.params.date]);

	function timeFor(idx: number): string {
		const start = newDate(day.date, day.startTime);
		start.setMinutes(start.getMinutes() + idx * Number(day.scheduleIncrement));
		return shortTime(start, true);
	}
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={stage.name} mapUrl={stage.mapUrl} backButton />
	{/snippet}
	<ul>
		{#each schedule as slot, idx}
			<li>
				<a class="time-slot" href={`#/${route.params.date}/artists/${slot.key}`}>
					<span class="time">{timeFor(idx)}</span>
					<span class="artist">
						{festival.artists[slot.key]?.name}
					</span>
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
