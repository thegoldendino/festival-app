<script lang="ts">
	import type { Snippet } from 'svelte';

	let { keys, item }: { keys: string[]; item: Snippet<[string, number]> } = $props();
</script>

<ul class="item-list">
	{#each keys as key, idx}
		<li>
			{@render item(key, idx)}
		</li>
	{/each}
</ul>

<style>
	.item-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.item-list li + li {
		border-top: 2px solid rgba(255, 255, 255, 0.25);
		border-bottom-width: 0;
	}

	.item-list :global(.item) {
		color: var(--footer-text-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		font-size: 1.25rem;
		height: 4rem;

		text-decoration: none;
	}
</style>
