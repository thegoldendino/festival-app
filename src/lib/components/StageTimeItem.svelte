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
		padding: 1rem 1.25rem;
		align-items: center;
	}
	.time {
		border-radius: 10px;
		padding: 0.25rem 0.35rem;
		font-size: 1rem;
		font-weight: 600;
		background-color: var(--color-primary-8);
	}
	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
