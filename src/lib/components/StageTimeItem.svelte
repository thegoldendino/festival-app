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
		align-items: center;
		gap: 1rem;
		padding-inline: 2rem;
	}
	.time {
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.25rem 0.35rem;
		background-color: var(--drawer-timepill-bg-color);
	}
	.stage-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-block-end: 0.25rem;
		border-bottom: dashed 3px var(--drawer-underline-color);
	}
</style>
