<script lang="ts">
	import FestivalApp from '$lib/FestivalApp.svelte';
	import type { ConfigParams } from '$types';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	let config: ConfigParams = {
		logoUrl: 'https://festival-app.s3.amazonaws.com/logo.png',
		days: data.days,
		artists: data.artists,
		stages: data.stages
	};
</script>

<h2>Mobile</h2>
<div class="mobile-preview">
	<FestivalApp {config} />
</div>

<style>
	.mobile-preview {
		width: 400px;
		height: 600px;
	}
</style>
