<script lang="ts">
	import type { Stage, Schedule, Stages } from '$types';

	let { date, schedule, stages }: { date: string; schedule: Schedule; stages: Stages } = $props();
</script>

<ul class="schedule-list">
	{#each schedule as { key, time }}
		<li>
			<a href={`#/${date}/stages/${key}`}>
				<span class="stage-name">
					{stages[key].name}
				</span>
				<span class="time">
					{time}
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.schedule-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.schedule-list > * + * {
		border-top: 1px solid #ccc;
		border-bottom-width: 0;
	}

	.schedule-list a {
		color: var(--footer-text-color);
		display: flex;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		font-size: 1.5rem;

		text-decoration: none;
	}
</style>
