<script lang="ts">
	import type { FestivalModel, RouteModel, Day, Stage, Schedule } from '$lib/types.js';
	import { getContext } from 'svelte';
	import { newDate, shortTime } from '$lib/utils/dateFormat.js';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Drawer from './Drawer.svelte';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import ItemList from './ItemList.svelte';
	import StagePinItem from './StagePinItem.svelte';
	import TimeArtistItem from './TimeArtistItem.svelte';
	import StageIcon from './StageIcon.svelte';
	import ArtistsIcon from './ArtistsIcon.svelte';
	import StageModel from '$lib/models/StageModel.svelte.js';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let stage: StageModel = $derived(festival.stage(route.params.key));
	let schedule: Schedule = $derived(stage.scheduleByDate(route.params.date) || []);
	let day: Day = $derived(festival.dayByDate(route.params.date));
	let stages = $derived(day.stageKeys.map((key) => festival.stage(key)));
	let showStages = $state(false);

	function timeFor(idx: number): string {
		const start = new Date(day.startTime);
		start.setMinutes(start.getMinutes() + idx * Number(day.scheduleIncrement));
		return shortTime(start, idx > 0);
	}

	function activeFor(idx: number): boolean {
		const start = new Date(day.startTime);
		start.setMinutes(start.getMinutes() + idx * Number(day.scheduleIncrement));
		const end = new Date(day.startTime);
		end.setMinutes(end.getMinutes() + (idx + 1) * Number(day.scheduleIncrement));
		const now = new Date();
		return now >= start && now < end;
	}

	let stageIdx = $derived(stages.findIndex((s) => s.key === stage.key) + 1);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={`${stageIdx}. ${stage.name}`} mapUrl={stage.mapUrl} backButton />
	{/snippet}

	<div class="content">
		<ItemList keys={schedule.map((s) => s.key)}>
			{#snippet item(key, idx)}
				<TimeArtistItem
					href={key && `#/${day.date}/artists/${key}`}
					name={festival.artists[key]?.name}
					time={timeFor(idx)}
					active={!!key && activeFor(idx)}
				/>
			{/snippet}
		</ItemList>
	</div>

	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton href={`#/${day.date}/artists`}>
				<ArtistsIcon></ArtistsIcon>
				{festival.options.text.artists}
			</ActionButton>
			<ActionButton onclick={() => (showStages = true)}>
				<StageIcon></StageIcon>
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
						name={festival.stage(key)?.name || ''}
						active={key === stage.key}
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

	.content :global(*) {
		color: var(--festapp-stage-schedule-text-color);
	}
</style>
