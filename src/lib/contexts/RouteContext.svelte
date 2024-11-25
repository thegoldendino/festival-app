<script lang="ts">
	import RouteModel from '$lib/models/RouteModel.svelte.js';
	import { onMount, setContext } from 'svelte';

	let { children } = $props();

	let route = new RouteModel();

	setContext('route', route);

	onMount(() => {
		updateRoute();
	});

	function updateRoute() {
		let hash = window.location.hash;
		route.navigateTo(hash);
	}
</script>

<svelte:window onhashchange={updateRoute} />

{@render children()}
