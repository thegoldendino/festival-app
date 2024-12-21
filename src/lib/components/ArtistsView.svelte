<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
</script>

<AppContainer>
	{#snippet infoHeader()}
		<InfoHeader title="Artists" backButton />
	{/snippet}
	<h2>Artists Index</h2>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
