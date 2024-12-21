<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import type { FestivalModel, Day, RouteModel } from '$types';
	import { getContext } from 'svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let selectedDay: Day = $derived(festival.dayByDate(route.params.date));
	let artists = $derived(
		selectedDay.artistKeys
			.map((key) => festival.artists[key])
			.sort((a, b) => a.name.localeCompare(b.name))
	);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={festival.options.text.artists} backButton />
	{/snippet}
	<div class="content">
		{#each artists as artist}
			<a
				class="artist"
				href={`#/${selectedDay.date}/artists/${artist.key}`}
				style="background-image: url({artist.imageUrl})"
				><div class="gradient-overlay">
					<h2>{artist.name}</h2>
					<p>{artist.location}</p>
				</div>
			</a>
		{/each}
	</div>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
		padding: 16px;
	}

	.artist {
		height: 200px;
		background-size: cover;
		background-position: center;
		border-radius: 8px;

		color: white;
		text-shadow: 0 0 4px black;
		text-decoration: none;
	}

	h2 {
		font-size: 1.5rem;
		margin: 0;
	}

	p {
		margin: 0;
	}

	.gradient-overlay {
		padding: 16px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
