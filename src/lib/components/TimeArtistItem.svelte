<script lang="ts">
	let { href, name, time, active = true, class: className = '', style = '' } = $props();
</script>

{#snippet item()}
	<span class="time">
		{time}
	</span>
	<span class="artist-name">
		{name}
	</span>
{/snippet}

{#if href}
	<a class="item {className}" {href} class:active {style}>
		{@render item()}
	</a>
{:else}
	<div class="item {className}" class:active {style}>
		{@render item()}
	</div>
{/if}

<style>
	:root {
		/* TimeArtistItem component variables */
		--festapp-time-artist-item-gap: var(--festapp-spacing-md, 1rem);
		--festapp-time-artist-item-padding-start: 1.2rem;
		--festapp-time-artist-item-padding-end: 1.4rem;
		
		/* Time pill */
		--festapp-time-artist-item-time-bg: var(--festapp-stage-schedule-timepill-bg-color, var(--festapp-color-primary-7));
		--festapp-time-artist-item-time-border-radius: var(--festapp-timepill-border-radius, var(--festapp-radius-pill, 30px));
		--festapp-time-artist-item-time-padding: var(--festapp-timepill-padding, 0.25rem 0.5rem);
		--festapp-time-artist-item-time-font-size: var(--festapp-timepill-font-size, var(--festapp-font-size-md, 1.25rem));
		--festapp-time-artist-item-time-font-weight: var(--festapp-timepill-font-weight, var(--festapp-font-weight-medium, 500));
		
		/* Artist name */
		--festapp-time-artist-item-name-padding-block: var(--festapp-spacing-xs, 0.3rem);
		--festapp-time-artist-item-name-border-bottom: dotted 6px var(--festapp-stage-schedule-underline-color, var(--festapp-color-primary-7));
		--festapp-time-artist-item-name-font-size: var(--festapp-stage-schedule-font-size, var(--festapp-font-size-xl, 1.75rem));
		--festapp-time-artist-item-name-font-weight: var(--festapp-stage-schedule-font-weight, var(--festapp-font-weight-light, 300));
		
		/* Active state */
		--festapp-time-artist-item-active-border: 1px solid var(--festapp-stage-schedule-active-border-color, var(--festapp-color-primary-4));
		--festapp-time-artist-item-active-bg: var(--festapp-stage-schedule-active-bg-color, var(--festapp-color-primary-6));
	}

	.item {
		align-items: center;
		gap: var(--festapp-time-artist-item-gap);
		padding-inline-start: var(--festapp-time-artist-item-padding-start);
		padding-inline-end: var(--festapp-time-artist-item-padding-end);
	}
	
	.time {
		flex: none;
		border-radius: var(--festapp-time-artist-item-time-border-radius);
		padding: var(--festapp-time-artist-item-time-padding);
		font-size: var(--festapp-time-artist-item-time-font-size);
		font-weight: var(--festapp-time-artist-item-time-font-weight);
		background-color: var(--festapp-time-artist-item-time-bg);
	}
	
	.artist-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block: var(--festapp-time-artist-item-name-padding-block);
		border-bottom: var(--festapp-time-artist-item-name-border-bottom);
		font-size: var(--festapp-time-artist-item-name-font-size);
		font-weight: var(--festapp-time-artist-item-name-font-weight);
	}

	.item.active {
		border-block: var(--festapp-time-artist-item-active-border);
		background-color: var(--festapp-time-artist-item-active-bg);
	}
</style>