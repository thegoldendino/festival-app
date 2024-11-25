<script lang="ts">
	import './styles.css';

	import FestivalContext from '$lib/contexts/FestivalContext.svelte';
	import RouteContext from '$lib/contexts/RouteContext.svelte';
	import AppContainer from '$lib/components/AppContainer.svelte';
	import type { ConfigParams } from '$types';

	let { config }: { config: ConfigParams } = $props();
</script>

<FestivalContext {config}>
	<RouteContext>
		<AppContainer></AppContainer>
	</RouteContext>
</FestivalContext>
