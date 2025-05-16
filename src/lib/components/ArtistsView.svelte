<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import type { FestivalModel, DayModel, RouteModel } from '$lib/types.js';
	import { getContext } from 'svelte';
	import { formatLongDay } from '$lib/utils/dateFormat.js';
	import { onMount } from 'svelte';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let selectedDay: DayModel = $derived(festival.dayByDate(route.params.date));
	let artists = $derived(
		selectedDay.artistKeys
			.map((key) => festival.artists[key])
			.sort((a, b) => a.name.localeCompare(b.name))
	);

	let title = $derived(`${formatLongDay(selectedDay.date)} ${festival.options.text.artists}`);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader {title} backButton />
	{/snippet}
	<div class="content">
		{#each artists as artist, index}
			<a href={`#/${selectedDay.date}/artists/${artist.key}`}>
				<div
					class="artist {mounted ? 'animate' : ''}"
					style="background-image: url({artist.image?.src}); animation-delay: {index * 0.1}s;"
				>
					<div class="gradient-overlay">
						<h2>{artist.name}</h2>
						<p>{artist.hometown}</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</AppContainer>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
		padding: 16px;
	}

	a {
		text-decoration: none;
	}

	.artist {
		height: 200px;
		background-color: var(--festapp-artists-noimage-bg-color);
		background-size: cover;
		background-position: center;
		border-radius: 8px;
		color: white;
		text-shadow: 0 0 4px black;
		opacity: 0;
	}

	.artist.animate {
		animation: fadeInUp 0.2s ease-in forwards;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	h2 {
		font-size: 1.5rem;
		margin: 0;
		opacity: 0.9;
	}

	p {
		margin: 0;
		opacity: 0.9;
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
