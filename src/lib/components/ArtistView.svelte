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
		{#if artist.image}
			<img
				src={artist.image?.src}
				alt={artist.name}
				width={artist.image?.width}
				height={artist.image?.height}
			/>
		{/if}
		<p>{artist.description}</p>
		{#if artist.infoUrl}
			<a class="more-info" href={artist.infoUrl}>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
					/></svg
				>
				More Info
			</a>
		{/if}
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
	:root {
		/* ArtistView component variables */
		--festapp-artist-content-text: var(--festapp-text-primary, var(--festapp-color-primary-2));
		--festapp-artist-content-font-size: var(--festapp-font-size-md, 1.25rem);
		--festapp-artist-image-height: 30lvh;
		--festapp-artist-image-initial-height: 40lvh;
		--festapp-artist-content-padding: var(--festapp-spacing-md, 1rem);
		--festapp-artist-content-line-height: 1.5;
		--festapp-artist-content-letter-spacing: 3px;
		--festapp-artist-more-info-gap: var(--festapp-spacing-xs, 0.5rem);
		--festapp-artist-more-info-font-size: var(--festapp-font-size-sm, 1rem);
		--festapp-artist-more-info-padding: var(--festapp-spacing-md, 1rem);
		--festapp-artist-more-info-margin-block: var(--festapp-spacing-lg, 1.5rem) var(--festapp-spacing-xl, 2rem);
		--festapp-artist-animation-duration: var(--festapp-animation-duration-normal, 0.2s);
		--festapp-artist-animation-timing: var(--festapp-animation-timing-ease-in, ease-in);
	}

	.content img {
		width: 100%;
		height: var(--festapp-artist-image-height);
		object-fit: cover;
		animation: shrink-image var(--festapp-artist-animation-duration) var(--festapp-artist-animation-timing) forwards;
	}

	@keyframes shrink-image {
		from {
			height: var(--festapp-artist-image-initial-height);
		}
		to {
			height: var(--festapp-artist-image-height);
		}
	}

	.content p {
		text-align: justify;
		line-height: var(--festapp-artist-content-line-height);
		font-size: var(--festapp-artist-content-font-size);
		padding: var(--festapp-artist-content-padding);
		color: var(--festapp-artist-content-text);
	}

	.content p::first-line {
		text-transform: uppercase;
		letter-spacing: var(--festapp-artist-content-letter-spacing);
	}

	.more-info {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: var(--festapp-artist-more-info-gap);
		text-decoration: none;
		color: var(--festapp-artist-content-text);
		font-size: var(--festapp-artist-more-info-font-size);
		padding: var(--festapp-artist-more-info-padding);
		margin-block-start: var(--festapp-artist-more-info-margin-block);
	}
</style>