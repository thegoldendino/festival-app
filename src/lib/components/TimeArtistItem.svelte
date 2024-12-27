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
	.item {
		align-items: center;
		gap: 1rem;
	}
	.time {
		border-radius: 10px;
		padding: 0.25rem 0.35rem;
		font-size: 1rem;
		font-weight: 600;
		background-color: var(--color-primary-7);
	}
	.artist-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block-end: 0.25rem;
		border-bottom: dashed 3px var(--color-primary-7);
	}
</style>
