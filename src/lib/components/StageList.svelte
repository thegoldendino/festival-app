<script lang="ts">
	import type { Stage } from '$types';
	import MapPin from './MapPin.svelte';

	let { date, stages }: { date: string; stages: Stage[] } = $props();
</script>

<ul class="stage-list">
	{#each stages as stage, idx}
		<li>
			<a href={`#/${date}/stages/${stage.key}`}>
				<span class="stage-name">
					{stage.name}
				</span>
				<span class="stage-number">
					<MapPin
						location={{ type: '*stage', stageIdx: idx + 1, x: 0, y: 0, key: stage.key }}
						--box-shadow="none"
					></MapPin>
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.stage-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.stage-list > * + * {
		border-top: 1px solid #ccc;
		border-bottom-width: 0;
	}

	.stage-list a {
		color: var(--footer-text-color);
		display: flex;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		font-size: 1.5rem;

		text-decoration: none;
	}
</style>
