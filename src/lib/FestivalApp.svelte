<script lang="ts">
	import './styles.css';

	import FestivalContext from '$lib/contexts/FestivalContext.svelte';
	import RouteContext from '$lib/contexts/RouteContext.svelte';
	import Route from '$lib/components/Route.svelte';
	import ArtistsView from '$lib/views/ArtistsView.svelte';
	import ArtistView from '$lib/views/ArtistView.svelte';
	import StageView from '$lib/views/StageView.svelte';
	import MapView from '$lib/views/MapView.svelte';
	import type { ConfigParams } from '$types';

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
