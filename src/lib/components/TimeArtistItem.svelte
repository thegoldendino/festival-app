<script lang="ts">
	let { href, name, time, active = true } = $props();
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
	<a class="item" {href} class:active>
		{@render item()}
	</a>
{:else}
	<div class="item" class:active>
		{@render item()}
	</div>
{/if}

<style>
	.item {
		align-items: center;
		gap: 1rem;
		padding-inline-start: 1.2rem;
		padding-inline-end: 1.4rem;
	}
	.time {
		flex: none;
		border-radius: var(--festapp-timepill-border-radius);
		padding: var(--festapp-timepill-padding);
		font-size: var(--festapp-timepill-font-size);
		font-weight: var(--festapp-timepill-font-weight);
		background-color: var(--festapp-stage-schedule-timepill-bg-color);
	}
	.artist-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block: 0.3rem;
		border-bottom: dotted 6px var(--festapp-stage-schedule-underline-color);
		font-size: var(--festapp-stage-schedule-font-size);
		font-weight: var(--festapp-stage-schedule-font-weight);
	}

	.item.active {
		border-block: 1px solid var(--festapp-stage-schedule-active-border-color);
		background-color: var(--festapp-stage-schedule-active-bg-color);
	}
</style>
