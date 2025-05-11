<script lang="ts">
	import type { MapLocation } from '$lib/types.js';

	let { location, idx = 0 }: { location: MapLocation; idx?: number } = $props();

	// remove '*' prefix from location.type
	function locationClass(location: MapLocation): string {
		return `${location.type.replace(/^\*/, '')}-pin`;
	}
</script>

{#snippet stagePin(location: MapLocation)}
	{#if location.type === '*stage'}
		{location.stageIdx}
	{/if}
{/snippet}

{#snippet medicPin(location: MapLocation)}
	{#if location.type === '*medic'}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M4 22q-.825 0-1.412-.587T2 20V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v12q0 .825-.587 1.413T20 22zm6-16h4V4h-4zm1 9v2q0 .425.288.713T12 18t.713-.288T13 17v-2h2q.425 0 .713-.288T16 14t-.288-.712T15 13h-2v-2q0-.425-.288-.712T12 10t-.712.288T11 11v2H9q-.425 0-.712.288T8 14t.288.713T9 15z"
			/></svg
		>
	{/if}
{/snippet}

{#snippet infoPin(location: MapLocation)}
	{#if location.type === '*info'}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
			/></svg
		>
	{/if}
{/snippet}

{#snippet pottyPin(location: MapLocation)}
	{#if location.type === '*potty'}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				d="M5.5 21v-6.5H5q-.425 0-.712-.288T4 13.5V9q0-.825.588-1.412T6 7h3q.825 0 1.413.588T11 9v4.5q0 .425-.288.713T10 14.5h-.5V21q0 .425-.288.713T8.5 22h-2q-.425 0-.712-.288T5.5 21m2-15q-.825 0-1.412-.587T5.5 4t.588-1.412T7.5 2t1.413.588T9.5 4t-.587 1.413T7.5 6M15 21v-5h-1.625q-.5 0-.8-.413t-.125-.912l2.1-6.325q.2-.65.737-1T16.5 7t1.213.35t.737 1l2.1 6.325q.175.5-.125.913t-.8.412H18v5q0 .425-.288.713T17 22h-1q-.425 0-.712-.288T15 21m1.5-15q-.825 0-1.412-.587T14.5 4t.588-1.412T16.5 2t1.413.588T18.5 4t-.587 1.413T16.5 6"
			/></svg
		>
	{/if}
{/snippet}

<a
	href={location.href}
	class={locationClass(location)}
	class:active={location.active}
	class:scale-in={true}
	style="--animation-order: {idx};"
>
	{@render stagePin(location)}
	{@render medicPin(location)}
	{@render infoPin(location)}
	{@render pottyPin(location)}
</a>

<style>
	.absolute {
		position: absolute;
	}

	.stage-pin,
	.potty-pin,
	.info-pin,
	.medic-pin {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--festapp-map-pin-text-color);
		text-decoration: none;
		width: 2rem;
		height: 2rem;
		font-size: 1.5rem;
	}

	.stage-pin {
		border-radius: 10%;
		box-shadow: var(--box-shadow, var(--shadow-4));
		background-color: var(--festapp-map-stage-bg-color);
		text-shadow: var(--festapp-button-text-shadow-color) 1px 0 10px;

		border-style: solid;
		border-width: 3px;
		border-color: var(--festapp-button-border-color);
		border-radius: var(--festapp-button-border-radius);
		height: 2.25rem;
		width: 2.25rem;
	}

	.potty-pin,
	.info-pin,
	.medic-pin {
		border-radius: 10%;
	}

	.potty-pin {
		background-color: var(--festapp-map-potty-bg-color);
	}
	.info-pin {
		background-color: var(--festapp-map-info-bg-color);
	}
	.medic-pin {
		background-color: var(--festapp-map-medic-bg-color);
	}
	.active {
		animation: pulse 1s infinite;
	}

	.scale-in {
		animation: scale-in 200ms ease-out forwards;
		animation-delay: calc(50ms * var(--animation-order, 0));
		transform: scale(0);
	}

	/* Skip animation for first pin (idx=0) */
	.scale-in[style*='--animation-order: 0'] {
		animation-duration: 0ms;
		transform: scale(1);
	}

	@keyframes scale-in {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
		}
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
		}
	}
</style>
