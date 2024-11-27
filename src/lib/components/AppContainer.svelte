<script lang="ts">
	import Header from '$lib/components/HeaderContainer.svelte';
	import Subheader from '$lib/components/SubheaderContainer.svelte';
	import Footer from '$lib/components/FooterContainer.svelte';
	import MapView from '$lib/components/MapView.svelte';
	import { getContext } from 'svelte';
	import type { FestivalModel, RouteModel } from '$types';

	const festival: FestivalModel = getContext('festival');
	const route: RouteModel = getContext('route');

	let day = $derived(festival.dayByDate(route.date));
</script>

<div class="app-container">
	<header>
		<Header></Header>
		<Subheader></Subheader>
	</header>
	<main>
		{#if route.view === 'map'}
			<MapView {day} />
		{:else if route.view === 'stages'}
			<h1>TODO STAGES</h1>
		{:else if route.view === 'artists'}
			<h1>TODO ARTISTS</h1>
		{/if}
	</main>
	<footer>
		<Footer></Footer>
	</footer>
</div>

<style>
	.app-container {
		container: festival-app / inline-size;
		background-color: #f0f0f0;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	header,
	footer {
		flex: none;
	}

	main {
		flex: 1;
		overflow-y: auto;
	}
</style>
