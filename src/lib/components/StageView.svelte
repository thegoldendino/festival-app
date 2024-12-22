<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$types';
	import { getContext } from 'svelte';
	import { newDate, shortTime } from '$utils/dateFormat.js';
	import StageList from '$lib/components/StageList.svelte';

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

<AppContainer openDrawer={showStages}>
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
		<div class="button-group">
			<a class="footer-button" href={`#/${day.date}/artists`}>
				{festival.options.text.artists}
			</a>
			<button class="footer-button" type="button" onclick={() => (showStages = true)}>
				{festival.options.text.stages}
			</button>
		</div>
	{/snippet}
	{#snippet drawer()}
		<div class="drawer-header">
			<button class="close-button" type="button" onclick={() => (showStages = false)}>
				&times;
			</button>
		</div>
		<StageList date={day.date} {stages} />
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

	/* TODO: Dedup and remove below styles similar to MapView footer*/
	.drawer-header {
		display: flex;
		justify-content: end;
		align-items: center;
		padding: 1rem;
		background-color: var(--footer-background-color);
		color: var(--footer-text-color);
	}

	.close-button {
		background-color: transparent;
		border: none;
		font-size: 2rem;
		color: var(--footer-text-color);
	}
	.footer-button {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 1rem;
		background-color: transparent;
		border: none;
		font-size: 1.5rem;
		text-decoration: none;
		color: var(--footer-text-color);
	}

	.button-group {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button-group > * + * {
		border-left: 1px solid var(--footer-text-color);
		border-right-width: 0;
	}
</style>
