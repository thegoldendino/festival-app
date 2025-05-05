<script lang="ts">
	let { href, name, time, active = true } = $props();
</script>

{#snippet item(name: string, time: string)}
	<span class="time">
		{time}
	</span>
	<span class="artist-name">
		{name}
	</span>
{/snippet}

{#if href}
	<a class="item" {href} class:active>
		{@render item(name, time)}
	</a>
{:else}
	<div class="item" class:active>
		{@render item(name, time)}
	</div>
{/if}

<style>
	.item {
		align-items: center;
		gap: 1rem;
		padding-inline: 2rem;
	}
	.time {
		border-radius: 10px;
		padding: 0.25rem 0.35rem;
		font-size: 1rem;
		font-weight: 600;
		background-color: var(--festapp-stage-schedule-timepill-bg-color);
	}
	.artist-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block-end: 0.25rem;
		border-bottom: dashed 3px var(--festapp-stage-schedule-underline-color);
	}

	.item.active {
		border-block: 1px solid var(--festapp-stage-schedule-active-border-color);
		background-color: var(--festapp-stage-schedule-active-bg-color);
	}
</style>
