<script>
	import MapPin from './MapPin.svelte';
	let { href, name, idx, key } = $props();
</script>

<a class="item" {href}>
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
