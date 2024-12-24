<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, Day, Artist } from '$types';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Drawer from './Drawer.svelte';
	import ScheduleList from './ScheduleList.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let artist: Artist = $derived(festival.artists[route.params.key]);
	let showSchedule = $state(false);
	let selectedDay: Day = $derived(festival.dayByDate(route.params.date));

	let schedule = $derived(artist.scheduleByDate[route.params.date]);

	$inspect(artist.scheduleByDate[route.params.date]);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={artist.name} subtitle={artist.location} backButton />
	{/snippet}

	<div class="content">
		<img src={artist.imageUrl} alt={artist.name} />
		<p>{artist.description}</p>
	</div>

	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton href={artist.infoUrl}>&lt;&lt; info</ActionButton>
			<ActionButton onclick={() => (showSchedule = true)}>Schedule</ActionButton>
		</ActionButtonGroup>
	{/snippet}

	{#snippet drawer()}
		<Drawer bind:open={showSchedule}>
			<ScheduleList date={selectedDay.date} stages={festival.stages} {schedule} />
		</Drawer>
	{/snippet}
</AppContainer>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
	}
	img {
		width: 60%;
		height: auto;
	}
</style>
