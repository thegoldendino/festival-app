<script lang="ts">
	import AppContainer from '$lib/components/AppContainer.svelte';
</script>

<AppContainer>
	{#snippet infoHeader()}<p>#todo</p>{/snippet}
	<h2>Stage Page</h2>
	{#snippet footer()}<p>#todo</p>{/snippet}
</AppContainer>
