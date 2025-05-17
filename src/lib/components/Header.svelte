<script lang="ts">
	import type { RouteModel, FestivalModel, DayModel } from '$lib/types.js';
	import DateSelection from './DateSelection.svelte';
	import { getContext } from 'svelte';

	let route: RouteModel = getContext('route');
	let festival: FestivalModel = getContext('festival');

	let daySelected: DayModel = $derived(festival.dayByDate(route.params.date));
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
	:root {
		/* Header component variables */
		--festapp-header-bg: var(--festapp-header-bg-color, var(--festapp-color-primary-8));
		--festapp-header-logo-padding-inline: var(--festapp-spacing-md, 1rem);
		--festapp-header-logo-padding-block: var(--festapp-spacing-xs, 0.5rem);
		--festapp-header-logo-height: 90%;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--festapp-header-bg);
		height: var(--festapp-header-height);
	}

	.logo-container {
		flex: none;
		height: var(--festapp-header-logo-height);
		display: flex;
		align-items: center;
		padding-inline: var(--festapp-header-logo-padding-inline);
		padding-block: var(--festapp-header-logo-padding-block);
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