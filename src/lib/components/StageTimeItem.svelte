<script>
	let { href, name, time } = $props();
</script>

<a class="item" {href}>
	<span class="stage-name">
		{name}
	</span>
	<span class="time">
		{time}
	</span>
</a>

<style>
	.item {
		align-items: center;
		gap: 1rem;
		padding-inline: 2rem;
	}
	.time {
		background-color: var(--festapp-drawer-timepill-bg-color);
		border-radius: var(--festapp-timepill-border-radius);
		padding: var(--festapp-timepill-padding);
		font-size: var(--festapp-timepill-font-size);
		font-weight: var(--festapp-timepill-font-weight);
	}
	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block: 0.3rem;
		border-bottom: dotted 6px var(--festapp-drawer-underline-color);
		font-size: var(--festapp-drawer-font-size);
	}
</style>
