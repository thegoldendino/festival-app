# MapContainer Component Options

The `MapContainer` component accepts a `mapOptions` prop that allows you to customize the Leaflet map instance. This document explains how to use these options effectively.

## Basic Usage

```svelte
<MapContainer 
  locations={locations}
  mapOptions={{ /* Leaflet map options here */ }}
/>
```

## Common Map Options

### Disable Map Interaction

To create a static map where users cannot pan/drag:

```svelte
<MapContainer 
  locations={locations} 
  mapOptions={{ 
    dragging: false, // Disable panning/dragging
    touchZoom: false, // Disable touch zoom
    scrollWheelZoom: false // Disable scroll wheel zoom
  }}
/>
```

### Restrict Zoom Levels

To limit how far users can zoom in or out:

```svelte
<MapContainer 
  locations={locations} 
  mapOptions={{ 
    minZoom: 10, // Prevent zooming out beyond level 10
    maxZoom: 18 // Prevent zooming in beyond level 18
  }}
/>
```

### Set Map Bounds

To restrict the viewable area:

```svelte
<MapContainer 
  locations={locations} 
  mapOptions={{ 
    maxBounds: [[47.60, -122.40], [47.70, -122.30]], // Northwest and Southeast corners
    maxBoundsViscosity: 1.0 // How "solid" the bounds are (0-1)
  }}
/>
```

### Control Keyboard Interaction

To disable keyboard navigation:

```svelte
<MapContainer 
  locations={locations} 
  mapOptions={{ 
    keyboard: false
  }}
/>
```

## Available Options

For a complete list of available options, refer to the [Leaflet Map options documentation](https://leafletjs.com/reference.html#map-option).

## Notes

- The MapContainer component will pass these options directly to the Leaflet map constructor.
- Options can be combined as needed.
- Some options may not be changeable after map initialization.
