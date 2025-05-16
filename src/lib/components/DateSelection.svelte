<script lang="ts">
	import { formatDate, formatShortDay } from '$lib/utils/dateFormat.js';
	import type { Day } from '$lib/types.js';
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
		width: 100%;
	}

	li {
		list-style-type: none;
		flex: 1;
	}

	a {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		color: var(--festapp-date-selection-text-color);
		border-inline: 1px solid var(--festapp-color-primary-7);
	}

	a:active,
	a:focus {
		background-color: var(--festapp-button-bg-color-active);
	}

	a.selected {
		background-color: var(--festapp-date-selection-selected-bg-color);
		color: var(--festapp-date-selection-selected-text-color);
		border-inline: 2px solid var(--festapp-date-selection-selected-border-color);
	}

	.day {
		font-size: 1.5em;
	}

	.date {
		font-size: 1em;
	}
</style>
