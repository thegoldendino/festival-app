<script>
	let { href, name, time } = $props();
</script>

<a class="item" {href}>
	<span class="artist-name">
		{name}
	</span>
	<span class="time">
		{time}
	</span>
</a>

<style>
	.time {
		padding-inline-start: 1rem;
	}
	.artist-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
