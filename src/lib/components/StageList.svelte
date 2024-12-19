<script lang="ts">
	import type { Stage } from '$types';

	let { date, stages }: { date: string; stages: Stage[] } = $props();
</script>

<h3>Stages</h3>
<ul class="stage-list">
	{#each stages as stage, idx}
		<li>
			<a href={`#/${date}/stages/${stage.key}`}>
				<span class="stage-number">
					{idx + 1}
				</span>
				<span class="stage-name">
					{stage.name}
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	h3 {
		margin: 0;
		padding: 1rem;
		text-align: right;
	}

	.stage-list {
		list-style-type: none;
		padding: 0;
	}

	.stage-list > * + * {
		border-top: 1px solid #ccc;
		border-bottom-width: 0;
	}

	.stage-list a {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}
</style>
