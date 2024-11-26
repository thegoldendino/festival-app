<script lang="ts">
	import MapView from '$lib/components/MapView.svelte';
	import type { FestivalModel, RouteModel } from '$types';
	import { getContext } from 'svelte';

	const festival: FestivalModel = getContext('festival');
	const route: RouteModel = getContext('route');

	let day = $derived(festival.dayByDate(route.date));
	let stages = $derived(festival.stagesByDate(route.date));

	let View = MapView;
</script>

<View {day} {stages} />
