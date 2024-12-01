<script lang="ts">
	import type { RouteModel, FestivalModel } from '$types';
	import DateSelection from './DateSelection.svelte';
	import { getContext } from 'svelte';

	let route: RouteModel = getContext('route');
	let festival: FestivalModel = getContext('festival');

	let daySelected = $derived(festival.dayByDate(route.params.date));
</script>

<div class="header-container">
	<div class="logo-container"></div>
	<DateSelection days={festival.daysSorted} {daySelected} />
</div>

<style>
	.header-container {
		display: flex;
		justify-content: space-between;
		background-color: var(--header-bg-color);
		height: var(--header-height);
	}
</style>
