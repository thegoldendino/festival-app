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
