<script lang="ts">
	import { mount, onDestroy, unmount } from 'svelte'; // Import mount
	import type { MapLocation } from '$lib/types.js';
	import type { Map as LeafletMap, LayerGroup } from 'leaflet';
	import MapPin from './MapPin.svelte';

	let L: any;
	let mapInstance = $state<LeafletMap | null>(null);
	let markerLayer = $state<LayerGroup | null>(null);
	let mapContainer = $state<HTMLDivElement | null>(null);

	let { locations }: { locations: MapLocation[] } = $props();

	let mapHeight = $state(0);
	let mapWidth = $state(0);
	let leafletLoaded = $state(false);
	let online = $state(false);

	// Dynamically import Leaflet in browser only
	$effect(() => {
		if (online) {
			Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]).then(([leaflet]) => {
				L = leaflet.default;
				leafletLoaded = true;
			});
		}
	});

	// Effect to initialize the map and update markers
	$effect(() => {
		// Make sure Leaflet is loaded and we're in the browser
		if (!leafletLoaded || !L || !online) {
			return;
		}

		// Ensure the container element is available
		if (!mapContainer) {
			console.warn('Map container not ready yet.');
			return;
		}

		// Ensure the map container has dimensions
		if (mapHeight === 0 || mapWidth === 0) {
			return;
		}

		// Initialize map only once
		if (!mapInstance) {
			mapInstance = L.map(mapContainer).setView([47.64547628145457, -122.3347581495176], 15); // Default view

			// Add OpenStreetMap tile layer
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(mapInstance);

			// Create a layer group to hold markers for easy clearing
			markerLayer = L.layerGroup().addTo(mapInstance);
		}
	});

	// Rest of your code remains the same, but with checks for L and mapInstance
	let markers = $derived.by(() => {
		if (!online || !mapInstance || !markerLayer) return [];

		markerLayer.clearLayers(); // Clear existing markers

		return locations.map((location, idx) => {
			const iconContainer = document.createElement('div');

			const mountedIcon = mount(MapPin, {
				target: iconContainer,
				props: {
					location,
					idx
				}
			});

			const divIcon = L.divIcon({
				html: iconContainer,
				className: 'svelte-leaflet-div-icon'
			});

			const marker = L.marker([location.lat, location.lng], { icon: divIcon });
			markerLayer && marker.addTo(markerLayer);

			return { instance: marker, mountedComponent: mountedIcon };
		});
	});

	$effect(() => {
		if (markers.length === 0) return;
		if (!L || !mapInstance) return;

		const bounds = L.latLngBounds(
			markers.map((m) => [m.instance.getLatLng().lat, m.instance.getLatLng().lng])
		);
		mapInstance?.fitBounds(bounds);
	});

	onDestroy(() => {
		if (mapInstance) {
			mapInstance.remove();
			mapInstance = null;
			markers.forEach((m) => {
				// Call unmount on the stored component reference
				unmount(m.mountedComponent);
				// Remove marker from map (triggers 'remove' event, but belt-and-suspenders)
				if (mapInstance && m.instance) {
					mapInstance.removeLayer(m.instance);
				}
			});
		}
	});
</script>

<svelte:window bind:online />

<div
	class="map-container"
	bind:this={mapContainer}
	bind:offsetHeight={mapHeight}
	bind:offsetWidth={mapWidth}
></div>

{#if !leafletLoaded || !mapInstance}
	<p>Loading Map...</p>
{/if}

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
