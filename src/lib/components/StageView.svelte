<script lang="ts">
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$types';
	import { getContext } from 'svelte';
	import { newDate, shortTime } from '$utils/dateFormat.js';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Drawer from './Drawer.svelte';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import ItemList from './ItemList.svelte';
	import StagePinItem from './StagePinItem.svelte';
	import TimeArtistItem from './TimeArtistItem.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: Stage = $derived(festival.stages[route.params.key]);
	let schedule: Schedule = $derived(stage.scheduleByDate[route.params.date]);
	let day: Day = $derived(festival.dayByDate(route.params.date));
	let stages = $derived(day.stageKeys.map((key) => festival.stages[key]));
	let showStages = $state(false);

	let title = $derived(`${stages.indexOf(stage) + 1}: ${stage.name}`);

	function timeFor(idx: number): string {
		const start = newDate(day.date, day.startTime);
		start.setMinutes(start.getMinutes() + idx * Number(day.scheduleIncrement));
		return shortTime(start, true);
	}
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader {title} mapUrl={stage.mapUrl} backButton />
	{/snippet}

	<div class="content">
		<ItemList keys={schedule.map((s) => s.key)}>
			{#snippet item(key, idx)}
				<TimeArtistItem
					href={`#/${day.date}/artists/${key}`}
					name={festival.artists[key].name}
					time={timeFor(idx)}
				/>
			{/snippet}
		</ItemList>
	</div>

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
			<ItemList keys={stages.map((s) => s.key)}>
				{#snippet item(key, idx)}
					<StagePinItem
						href={`#/${day.date}/stages/${key}`}
						name={festival.stages[key].name}
						{idx}
						{key}
					/>
				{/snippet}
			</ItemList>
		</Drawer>
	{/snippet}
</AppContainer>

<style>
	.content {
		margin-block: 1rem;
	}
</style>
