<script>
	import MapPin from './MapPin.svelte';
	let { href, name, idx, key, active = false } = $props();
</script>

<a class="item" {href} class:active>
	<span class="stage-name">
		{name}
	</span>
	<span class="stage-number">
		<MapPin
			location={{ type: '*stage', stageIdx: idx + 1, lat: 0, lng: 0, key: key, href }}
			--box-shadow="none"
		></MapPin>
	</span>
</a>

<style>
	:root {
		/* StagePinItem component variables */
		--festapp-stage-pin-item-gap: var(--festapp-spacing-md, 1rem);
		--festapp-stage-pin-item-padding-inline: var(--festapp-spacing-xl, 2rem);
		--festapp-stage-pin-item-name-padding-block: var(--festapp-spacing-xs, 0.3rem);
		--festapp-stage-pin-item-name-font-size: var(--festapp-drawer-font-size, var(--festapp-font-size-xl, 1.75rem));
		--festapp-stage-pin-item-name-border-bottom: dotted 6px var(--festapp-drawer-underline-color, var(--festapp-color-primary-5));
		--festapp-stage-pin-item-active-bg: var(--festapp-drawer-active-bg-color, var(--festapp-color-primary-5));
		--festapp-stage-pin-item-active-height: 4rem;
	}

	.item {
		align-items: center;
		gap: var(--festapp-stage-pin-item-gap);
		padding-inline: var(--festapp-stage-pin-item-padding-inline);
	}

	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block: var(--festapp-stage-pin-item-name-padding-block);
		font-size: var(--festapp-stage-pin-item-name-font-size);
		border-bottom: var(--festapp-stage-pin-item-name-border-bottom);
	}

	.item.active {
		background-color: var(--festapp-stage-pin-item-active-bg);
		height: var(--festapp-stage-pin-item-active-height);
	}
</style>