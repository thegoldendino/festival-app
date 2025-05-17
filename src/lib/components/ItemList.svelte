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
	:root {
		/* ItemList component variables */
		--festapp-item-list-border-top: 2px solid rgba(255, 255, 255, 0.15);
		--festapp-item-list-item-height: 4.25rem;
		--festapp-item-list-font-size: var(--festapp-font-size-md, 1.25rem);
	}

	.item-list {
		list-style-type: none;
		padding: 0 0;
		margin: 0;
	}

	.item-list li + li {
		border-bottom-width: 0;
	}

	.item-list :global(.item) {
		display: flex;
		justify-content: space-between;
		font-size: var(--festapp-item-list-font-size);
		height: var(--festapp-item-list-item-height);
		text-decoration: none;
	}
</style>