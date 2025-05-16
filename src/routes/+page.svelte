<script lang="ts">
	import FestivalApp from '$lib/FestivalApp.svelte';
	import type { ConfigParams } from '$lib/types.js';
	import type { PageData } from './$types.js';
	import '$lib/styles.css';
	import { FestivalBuilder } from '$lib/index.js';

	let { data }: { data: PageData } = $props();

	let config: ConfigParams = {
		days: data.days,
		artists: data.artists,
		stages: data.stages,
		options: data.options
	};

	// Desktop setup
	const festival = new FestivalBuilder(config).build();

	function getSchedule(day: { date: string }) {
		return festival.scheduleByDate(day.date);
	}
</script>

<h2>Mobile</h2>
<div class="mobile-preview">
	<FestivalApp {config} />
</div>

<h2>Desktop</h2>
<div class="desktop-preview">
	{#each festival.daysSorted as day}
		<div class="day-preview">
			<h3>{day.date} - {day.display}</h3>
			<div class="day-schedule">
				{#each day.stageKeys as key}
					<div class="stage-header"></div>
					<div class="stage-header">
						<h4>{festival.stage(key).name}</h4>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	h2 {
		margin-block-start: 5rem;
	}
	.mobile-preview {
		width: 400px;
		height: 700px;
	}
</style>
