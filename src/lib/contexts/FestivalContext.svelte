<script lang="ts">
	import FestivalBuilder from '$lib/builders/FestivalBuilder.js';
	import { setContext } from 'svelte';

	let { children, config } = $props();

	const festival = new FestivalBuilder(config).build();

	if (festival.isValid) {
		setContext('festival', festival);
	} else {
		console.error('Invalid festival config', festival.errors);
	}

	//$inspect(festival.scheduleByDate(festival.defaultDay.date));
</script>

{#if festival.isValid}
	{@render children()}
{/if}
