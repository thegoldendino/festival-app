# Festival App

A mobile kiosk for festival information. Each festival day displays a pannable/zoomable map image with positioned stage pins.
Stages display artist schedules with links to more artist information.

![Festival App Mobile Demo](https://ik.imagekit.io/thegoldendino/goldendino/festival-app-demo_wZDf1xAXB.gif?updatedAt=1735724073459&tr=w-300)

[demo site](https://festival-app-dev.netlify.app/)

## Features

- Pannable/Zoomable map image
- Configuration schema
- Browser history state maintained.

## Installing

```sh
npm install --save-dev @thegoldendino/festival-app
```

## Usage

```html
<script lang="ts">
	import FestivalApp from '@thegoldendino/festival-app';
	import type { ConfigParams } from '@thegoldendino/festival-app';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	let config: ConfigParams = {
		days: data.days,
		artists: data.artists,
		stages: data.stages,
		options: data.options
	};
</script>

<div class="mobile-preview">
	<FestivalApp {config} />
</div>

<style>
	.mobile-preview {
		width: 400px;
		height: 700px;
	}
</style>

```

## Config Schema

[docs/config.md](./docs/config.md)

### Example Config [TOML](https://toml.io)

- [days](./src/data/days.toml): schedule and map data for a festival day
- [artists](./src/data/artists.toml): artist information
- [stages](./src/data/stages.toml): stage information
- [options](./src/data/options.toml): application specific options

## Static Site Implementation

Though any repository can generate a Config object, FestivalApp is designed to not require a CMS or any 3rd party backend.
Image file nameing conventions provide a reference to the record keys in the DaysConfig and ArtistsConfig.

### Example

```toml
# artists.toml

[brasscheeks]
name = "Brass Cheeks"
```

- `brasscheeks` key requires a corresponding image file `brasscheeks.jpg` (extension agnostic: 'png', 'jpeg', 'webp'). 
- We can then use Vite's file glob feature to pull all image files.
- Similarly a Day record with key `2025-06-01` should have a corresponding map image `2025-06-01.png` file.

### Merging Vite processed images

Each [ConfigDay](./docs/config.md#configday) and [ConfigArtist](./docs/config.md#configartist) has an Image which includes [src, width, height](./docs/config.md#image). Instead of manually entering these values, Vite provides the ability to pull this data from a directory of images. **Each image must be named the same as the corresponding record key.**

__see [+page.serve.ts](./src/routes/+page.server.ts) for example.__

## Styling

The FestivalApp takes advantage of svelte's ability to [pass custom properties](https://svelte.dev/docs/svelte/custom-properties) to its components.

### Example


```html
<FestivalApp {config}
	--festapp-color-primary-hue="100"
	--festapp-color-secondary-hue="187"
>
```

_see all custom property [variables.css](./src/lib/styles/variables.css)_


## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of the festival-app library, everything inside `src/routes` is used as a showcase for the festival-app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

## License

[MIT](LICENSE.md)