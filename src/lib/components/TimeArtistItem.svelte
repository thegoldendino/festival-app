<script>
	let { href, name, time } = $props();
</script>

<a class="item" {href}>
	<span class="time">
		{time}
	</span>
	<span class="artist-name">
		{name}
	</span>
</a>
