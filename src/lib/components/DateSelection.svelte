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
	:root {
		/* DateSelection component variables */
		--festapp-date-selection-text: var(--festapp-text-primary, var(--festapp-color-primary-1));
		--festapp-date-selection-selected-text: var(--festapp-text-secondary, var(--festapp-color-secondary-1));
		--festapp-date-selection-selected-bg: var(--festapp-interactive-bg, var(--festapp-color-secondary-6));
		--festapp-date-selection-selected-border: var(--festapp-interactive-border, var(--festapp-color-secondary-4));
		--festapp-date-selection-border: var(--festapp-color-primary-7);
		--festapp-date-selection-border-width: var(--festapp-border-width-sm, 1px);
		--festapp-date-selection-selected-border-width: var(--festapp-border-width-md, 2px);
		--festapp-date-selection-day-font-size: var(--festapp-font-size-lg, 1.5em);
		--festapp-date-selection-date-font-size: var(--festapp-font-size-sm, 1em);
	}

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
		color: var(--festapp-date-selection-text);
		border-inline: var(--festapp-date-selection-border-width) solid var(--festapp-date-selection-border);
	}

	a:active,
	a:focus {
		background-color: var(--festapp-action-button-bg-active, var(--festapp-interactive-bg-hover));
	}

	a.selected {
		background-color: var(--festapp-date-selection-selected-bg);
		color: var(--festapp-date-selection-selected-text);
		border-inline: var(--festapp-date-selection-selected-border-width) solid var(--festapp-date-selection-selected-border);
	}

	.day {
		font-size: var(--festapp-date-selection-day-font-size);
	}

	.date {
		font-size: var(--festapp-date-selection-date-font-size);
	}
</style>