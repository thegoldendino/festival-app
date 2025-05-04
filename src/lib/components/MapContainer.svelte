<script lang="ts">
	import type { Day, Stages } from '$lib/types.js';
	import { mount, onDestroy, unmount } from 'svelte'; // Import mount
	import MapModel from '$lib/models/MapModel.svelte.js';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	// --- State ---
	import type { Map as LeafletMap, LayerGroup } from 'leaflet';
	import MapPin from './MapPin.svelte';
	import type StageModel from '$lib/models/StageModel.svelte.js';

	let mapInstance = $state<LeafletMap | null>(null);
	/** @type {LayerGroup | null} */
	let markerLayer = $state<LayerGroup | null>(null);
	/** @type {HTMLElement | null} */
	let mapContainer = $state<HTMLDivElement | null>(null);

	let { day, stages }: { day: Day; stages: Record<string, StageModel> } = $props();

	let mapModel = $derived(new MapModel(day, stages));

	// Effect to initialize the map and update markers
	$effect(() => {
		// Ensure the container element is available
		if (!mapContainer) {
			console.warn('Map container not ready yet.');
			return;
		}

		// Initialize map only once
		if (!mapInstance) {
			mapInstance = L.map(mapContainer).setView([47.64547628145457, -122.3347581495176], 15); // Default view

			// Add OpenStreetMap tile layer
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(mapInstance);

			// Create a layer group to hold markers for easy clearing
			markerLayer = L.layerGroup().addTo(mapInstance);
		}

		// Cleanup function for the effect (runs when component is destroyed)
	});

	let markers = $derived.by(() => {
		if (mapInstance && markerLayer) {
			markerLayer.clearLayers(); // Clear existing markers

			return mapModel.locations.map((location) => {
				const iconContainer = document.createElement('div');

				const href =
					(location.type === '*stage' && `#/${day.date}/stages/${location.key}`) ||
					`http://maps.google.com/?q=${location.lat},${location.lng}`;

				const mountedIcon = mount(MapPin, {
					target: iconContainer,
					props: {
						location,
						href
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
		} else {
			return [];
		}
	});

	$effect(() => {
		if (markers.length > 0) {
			const bounds = L.latLngBounds(
				markers.map((m) => [m.instance.getLatLng().lat, m.instance.getLatLng().lng])
			);
			mapInstance?.fitBounds(bounds);
		}
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

<div class="map-container" bind:this={mapContainer}></div>

{#if !mapInstance}
	<p>Loading Map...</p>
{/if}

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
