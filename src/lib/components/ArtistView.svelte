<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, Day, Artist } from '$types';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Drawer from './Drawer.svelte';
	import ItemList from './ItemList.svelte';
	import StageTimeItem from './StageTimeItem.svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let artist: Artist = $derived(festival.artists[route.params.key]);
	let showSchedule = $state(false);
	let selectedDay: Day = $derived(festival.dayByDate(route.params.date));

	let schedule = $derived(artist.scheduleByDate[route.params.date]);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={artist.name} subtitle={artist.location} backButton />
	{/snippet}

	<div class="content">
		<img
			src={artist.image?.src}
			alt={artist.name}
			width={artist.image?.width}
			height={artist.image?.height}
		/>
		<p>{artist.description}</p>
	</div>

	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton href={artist.infoUrl}>Info</ActionButton>
			<ActionButton onclick={() => (showSchedule = true)}>Schedule</ActionButton>
		</ActionButtonGroup>
	{/snippet}

	{#snippet drawer()}
		<Drawer bind:open={showSchedule}>
			<ItemList keys={schedule.map((s) => s.key)}>
				{#snippet item(key, idx)}
					<StageTimeItem
						href={`#/${selectedDay.date}/stages/${key}`}
						name={festival.stages[key].name}
						time={schedule[idx].time}
					/>
				{/snippet}
			</ItemList>
		</Drawer>
	{/snippet}
</AppContainer>

<style>
	.content img {
		width: 100%;
		height: auto;
	}

	.content p {
		text-align: justify;
		line-height: 1.5;
		font-size: 1.25rem;
		padding: 0 1rem;
		color: var(--artist-content-text-color);
	}

	.content p::first-line {
		text-transform: uppercase;
		letter-spacing: 3px;
	}
	img {
		width: 60%;
		height: auto;
	}
</style>
