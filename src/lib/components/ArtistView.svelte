<script lang="ts">
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, DayModel, Artist } from '$lib/types.js';
	import ActionButtonGroup from './ActionButtonGroup.svelte';
	import ActionButton from './ActionButton.svelte';
	import AppContainer from './AppContainer.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Drawer from './Drawer.svelte';
	import ItemList from './ItemList.svelte';
	import StageTimeItem from './StageTimeItem.svelte';
	import ScheduleIcon from './ScheduleIcon.svelte';
	import { shortTime } from '$lib/utils/dateFormat.js';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let artist: Artist = $derived(festival.artists[route.params.key]);
	let showSchedule = $state(false);
	let selectedDay: DayModel = $derived(festival.dayByDate(route.params.date));

	let schedule = $derived(artist.scheduleByDate[route.params.date]);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader
			title={artist.name}
			subtitle={artist.hometown}
			infoUrl={artist.infoUrl}
			backButton
		/>
	{/snippet}

	<div class="content">
		<img
			src={artist.image?.src}
			alt={artist.name}
			width={artist.image?.width}
			height={artist.image?.height}
		/>
		<p>{artist.description}</p>
		<a class="more-info" href={artist.infoUrl}>
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
				/></svg
			>
			More Info
		</a>
	</div>

	{#snippet footer()}
		<ActionButtonGroup>
			<ActionButton onclick={() => (showSchedule = true)}>
				<ScheduleIcon></ScheduleIcon>
				Schedule
			</ActionButton>
		</ActionButtonGroup>
	{/snippet}

	{#snippet drawer()}
		<Drawer bind:open={showSchedule}>
			<ItemList keys={schedule.map((s) => s.key)}>
				{#snippet item(key, idx)}
					<StageTimeItem
						href={`#/${selectedDay.date}/stages/${key}`}
						name={festival.stage(key).name}
						time={shortTime(schedule[idx].start)}
					/>
				{/snippet}
			</ItemList>
		</Drawer>
	{/snippet}
</AppContainer>

<style>
	.content img {
		width: 100%;
		height: 30lvh;
		object-fit: cover;
		animation: shrink-image 0.2s ease-in forwards;
	}

	@keyframes shrink-image {
		from {
			height: 40lvh;
		}
		to {
			height: 30lvh;
		}
	}

	.content p {
		text-align: justify;
		line-height: 1.5;
		font-size: var(--festapp-artist-content-font-size);
		padding: 0 1rem;
		color: var(--festapp-artist-content-text-color);
	}

	.content p::first-line {
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	.more-info {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--festapp-artist-content-text-color);
		font-size: 1rem;
		padding: 1rem;
		margin-block-start: 3rem;
		margin-block-end: 1rem;
	}
</style>
