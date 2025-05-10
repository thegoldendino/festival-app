<script lang="ts">
	import type { ConfigParams } from '$lib/types.js';
	import FestivalContext from '$lib/contexts/FestivalContext.svelte';
	import RouteContext from '$lib/contexts/RouteContext.svelte';
	import Route from '$lib/components/Route.svelte';
	import ArtistsView from '$lib/components/ArtistsView.svelte';
	import ArtistView from '$lib/components/ArtistView.svelte';
	import StageView from '$lib/components/StageView.svelte';
	import MapView from '$lib/components/MapView.svelte';

	let { config }: { config: ConfigParams } = $props();
</script>

<FestivalContext {config}>
	<RouteContext>
		<Route path="/:date/artists/:artist">
			<ArtistView></ArtistView>
		</Route>
		<Route path="/:date/artists">
			<ArtistsView></ArtistsView>
		</Route>
		<Route path="/:date/stages/:stage">
			<StageView></StageView>
		</Route>
		<Route path="/:date">
			<MapView></MapView>
		</Route>
		<Route path="/">
			<MapView></MapView>
		</Route>
	</RouteContext>
</FestivalContext>
