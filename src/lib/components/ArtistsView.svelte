<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import type { FestivalModel } from '$types';
	import { getContext } from 'svelte';

	let festival: FestivalModel = getContext('festival');
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title={festival.options.text.artists} backButton />
	{/snippet}
	<h2>Artists Index</h2>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
