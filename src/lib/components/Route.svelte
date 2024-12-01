<script lang="ts">
	import type { RouteModel } from '$types';
	import { getContext, onMount } from 'svelte';
	let { path, children } = $props();

	const route: RouteModel = getContext('route');

	onMount(() => {
		route.defineRoute(path, children);
	});
</script>
