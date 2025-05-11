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
	.item {
		align-items: center;
		gap: 1rem;
		padding-inline: 2rem;
	}

	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block: 0.3rem;
		font-size: var(--festapp-drawer-font-size);
		border-bottom: dotted 6px var(--festapp-drawer-underline-color);
	}

	.item.active {
		background-color: var(--festapp-drawer-active-bg-color);
		height: 4rem;
	}
</style>
