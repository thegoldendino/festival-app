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
			location={{ type: '*stage', stageIdx: idx + 1, x: 0, y: 0, key: key }}
			--box-shadow="none"
		></MapPin>
	</span>
</a>

<style>
	.item {
		align-items: center;
		gap: 1rem;
		padding-inline: 2rem;
	}

	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block-end: 0.25rem;
		border-bottom: dashed 3px var(--drawer-underline-color);
	}

	.item.active {
		background-color: var(--drawer-active-bg-color);
		height: 4rem;
	}
</style>
