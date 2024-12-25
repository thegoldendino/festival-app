<script lang="ts">
	import { formatDate, formatShortDay } from '$utils/dateFormat.js';
	import type { Day } from '$types';
	let { days, daySelected } = $props();
</script>

{#snippet selection(day: Day)}
	<li>
		<a href="#/{day.date}" class:selected={day.date === daySelected.date}>
			<span class="day">{formatShortDay(day.date)}</span>
			<span class="date">{formatDate(day.date)}</span>
		</a>
	</li>
{/snippet}

<menu>
	{#each days as day}
		{@render selection(day)}
	{/each}
</menu>

<style>
	menu {
		display: flex;
		height: 100%;
		margin: 0;
		padding: 0;
		justify-content: end;
	}

	li {
		list-style-type: none;
	}

	a {
		height: 100%;
		padding-inline: 1.5em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		color: var(--date-selection-text-color);
	}

	a.selected {
		background-color: var(--date-selection-selected-bg-color);
		color: var(--date-selection-selected-text-color);
	}

	.day {
		font-size: 1.5em;
	}

	.date {
		font-size: 1em;
	}
</style>
