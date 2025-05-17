# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Festival App is a mobile kiosk SvelteKit application for displaying festival information. It features:
- Pannable/zoomable map with stage locations
- Artist schedules and details 
- Configuration via TOML files
- Browser history state management

The app displays festival days with interactive maps showing stage pins. Each stage displays artist schedules with links to more artist information.

## Commands

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start development server and open browser
npm run dev -- --open

# Connect to Android device via ADB for mobile testing
npm run adb
```

### Testing

```bash
# Run unit tests
npm run test:unit

# Run specific unit test in watch mode
npm run test:unit -- -t "test name" --watch

# Run all tests (unit and e2e)
npm run test

# Run e2e tests
npm run test:e2e
```

### Building & Packaging

```bash
# Build for production
npm run build

# Package the library
npm run package

# Build and package (recommended)
npm run build

# Preview the production build
npm run preview
```

### Code Quality

```bash
# Type checking
npm run check

# Type checking in watch mode
npm run check:watch

# Format code
npm run format

# Lint code
npm run lint

# Generate documentation from schemas
npm run docs
```

## Architecture

The application follows a component-based architecture using Svelte 5 and has a clear separation between the library code and the demo application:

- `src/lib`: The festival-app library code
- `src/routes`: The demo application/showcase for the library

### Core Components

1. **Context Providers**
   - `FestivalContext`: Provides festival data to child components
   - `RouteContext`: Handles routing and navigation

2. **Models**
   - `FestivalModel`: Core model for festival data
   - `DayModel`: Represents a festival day
   - `StageModel`: Represents a stage
   - `MapModel`: Handles map data and locations
   - `RouteModel`: Manages routing

3. **Builders**
   - `FestivalBuilder`: Processes configuration and builds models

4. **Views**
   - `MapView`: Main map view with stage pins
   - `ArtistsView`: List of artists
   - `ArtistView`: Details about a specific artist
   - `StageView`: Schedule for a specific stage

5. **Data Flow**
   - Config data (TOML files) → FestivalBuilder → Models → Components → UI

### Configuration Schema

The app relies on a set of TOML configuration files:
- `days.toml`: Schedule and map data for festival days
- `artists.toml`: Artist information
- `stages.toml`: Stage information
- `options.toml`: Application-specific options

The schema is defined using Zod and documented in `docs/config.md`.

## Implementation Details

1. **Image Handling**
   - Images must match record keys (e.g., artist with key "brasscheeks" should have image "brasscheeks.jpg")
   - Vite's file glob imports match images with configuration records

2. **Map Implementation**
   - Uses Leaflet via the `sveaflet` package
   - MapContainer component handles rendering the map and markers

3. **Styling**
   - Customizable via CSS custom properties
   - See `src/lib/styles/variables.css` for available properties

4. **Routing**
   - Custom routing implementation with hash-based navigation
   - Routes defined in `FestivalApp.svelte`

5. **Type Safety**
   - Strong typing with TypeScript
   - Schema validation with Zod

## Publishing

To publish the library to npm:

```bash
npm publish --access public
```