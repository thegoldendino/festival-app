<script lang="ts">
	import type { RouteModel, FestivalModel } from '$lib/types.js';
	import DateSelection from './DateSelection.svelte';
	import { getContext } from 'svelte';

	let route: RouteModel = getContext('route');
	let festival: FestivalModel = getContext('festival');

	let daySelected = $derived(festival.dayByDate(route.params.date));
</script>

<div class="header-container">
	<div class="logo-container">
		<a href="/">
			<img
				src={festival.options.logoImage?.src}
				width={festival.options.logoImage?.width}
				height={festival.options.logoImage?.height}
				alt="home"
			/>
		</a>
	</div>
	<DateSelection days={festival.daysSorted} {daySelected} />
</div>

<style>
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--festapp-header-bg-color);
		height: var(--festapp-header-height);
	}

	.logo-container {
		height: 90%;
		display: flex;
		align-items: center;
		padding-inline: 1rem;
		padding-block: 0.5rem;
	}
	a {
		text-decoration: none;
		display: block;
		height: 100%;
	}
	img {
		height: 100%;
		width: auto;
	}
</style>
