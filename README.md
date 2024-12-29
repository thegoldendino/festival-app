# Festival App

A Svelte component that provides a mobile kiosk for festival information.
Multiple days can be shown, each with a map of stage locations and schedules. All schedule information
links to artist information.



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

<div class="fullscreen-preview">
	<FestivalApp {config} />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	.fullscreen-preview {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
	}
</style>

```

## Config Schema

[docs/config.md](./docs/config.md)

### TOML Example

- [days](./src/data/days.toml): schedule and map data for a festival day
- [artists](./src/data/artists.toml): artist information
- [stages](./src/data/stages.toml): stage information
- [options](./src/data/options.toml): application specific options


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