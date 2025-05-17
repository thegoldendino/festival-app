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
	:root {
		/* StageTimeItem component variables */
		--festapp-stage-time-item-padding-inline: var(--festapp-spacing-xl, 2rem);
		--festapp-stage-time-item-gap: var(--festapp-spacing-md, 1rem);
		--festapp-stage-time-item-time-bg: var(--festapp-drawer-timepill-bg-color, var(--festapp-color-primary-8));
		--festapp-stage-time-item-time-border-radius: var(--festapp-timepill-border-radius, var(--festapp-radius-pill, 30px));
		--festapp-stage-time-item-time-padding: var(--festapp-timepill-padding, 0.25rem 0.5rem);
		--festapp-stage-time-item-time-font-size: var(--festapp-timepill-font-size, var(--festapp-font-size-md, 1.25rem));
		--festapp-stage-time-item-time-font-weight: var(--festapp-timepill-font-weight, var(--festapp-font-weight-medium, 500));
		--festapp-stage-time-item-name-padding-block: var(--festapp-spacing-xs, 0.3rem);
		--festapp-stage-time-item-name-border-bottom: dotted 6px var(--festapp-drawer-underline-color, var(--festapp-color-primary-5));
		--festapp-stage-time-item-name-font-size: var(--festapp-drawer-font-size, var(--festapp-font-size-xl, 1.75rem));
	}

	.item {
		align-items: center;
		gap: var(--festapp-stage-time-item-gap);
		padding-inline: var(--festapp-stage-time-item-padding-inline);
	}
	.time {
		background-color: var(--festapp-stage-time-item-time-bg);
		border-radius: var(--festapp-stage-time-item-time-border-radius);
		padding: var(--festapp-stage-time-item-time-padding);
		font-size: var(--festapp-stage-time-item-time-font-size);
		font-weight: var(--festapp-stage-time-item-time-font-weight);
	}
	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block: var(--festapp-stage-time-item-name-padding-block);
		border-bottom: var(--festapp-stage-time-item-name-border-bottom);
		font-size: var(--festapp-stage-time-item-name-font-size);
	}
</style>