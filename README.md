# Festival App

A mobile kiosk for festival information. Each festival day displays a pannable/zoomable map image with positioned stage pins.
Stages display artist schedules with links to more artist information.

![Festival App Mobile Demo](https://ik.imagekit.io/thegoldendino/goldendino/festival-app-demo_wZDf1xAXB.gif)

## Features

- Pannable/Zoomable map image
- Configuration schema
- Browser history state maintained through custom hash router.

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


### Merging Vite processed images

Config Days and Artists each have an Image which includes src, width, height. Instead of manually entering these values, Vite provides options to pull this data from a directory of images. **Each image must be named the same as the corresponding record key.**

__see [+page.serve.ts](./src/lib/routes/+page.server.ts) for example.__

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

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

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

## License

[MIT](LICENSE.md)