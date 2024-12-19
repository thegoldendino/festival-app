<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';

	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel, Day, Artist } from '$types';

	let festival: FestivalModel = getContext('festival');
	let route: RouteModel = getContext('route');
	let artist: Artist = $derived(festival.artists[route.params.key]);
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={artist.name} subtitle={artist.location} backButton />
	{/snippet}
	<div class="content">
		<img src={artist.imageUrl} alt={artist.name} />
		<p>{artist.description}</p>
	</div>
	{#snippet footer()}<p>#todo</p>{/snippet}
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
