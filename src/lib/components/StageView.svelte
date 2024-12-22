<script lang="ts">
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$types';
	import { getContext } from 'svelte';
	import { newDate, shortTime } from '$utils/dateFormat.js';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import StageList from './StageList.svelte';
	import Drawer from './Drawer.svelte';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: Stage = $derived(festival.stages[route.params.key]);
	let schedule: Schedule = $derived(stage.scheduleByDate[route.params.date]);
	let day: Day = $derived(festival.dayByDate(route.params.date));
	let stages = $derived(day.stageKeys.map((key) => festival.stages[key]));
	let showStages = $state(false);

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
	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton href={`#/${day.date}/artists`}>
				{festival.options.text.artists}
			</ActionButton>
			<ActionButton onclick={() => (showStages = true)}>
				{festival.options.text.stages}
			</ActionButton>
		</ActionButtonGroup>
	{/snippet}

	{#snippet drawer()}
		<Drawer bind:open={showStages}>
			<StageList date={day.date} {stages} />
		</Drawer>
	{/snippet}
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
