<script lang="ts">
	import Header from '$lib/components/HeaderContainer.svelte';
	import Subheader from '$lib/components/SubheaderContainer.svelte';
	import Content from '$lib/components/ContentContainer.svelte';
	import Footer from '$lib/components/FooterContainer.svelte';
</script>

<div class="app-container">
	<header>
		<Header></Header>
		<Subheader></Subheader>
	</header>
	<main>
		<Content></Content>
	</main>
	<footer>
		<Footer></Footer>
	</footer>
</div>

<style>
	.app-container {
		container: festival-app / inline-size;
		background-color: #f0f0f0;
		height: 100%;
		display: grid;
		grid-template-rows:
			calc(var(--header-height) + var(--subheader-height))
			1fr
			var(--footer-height);
	}
	main {
		overflow-y: auto;
	}
</style>
