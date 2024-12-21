import type { MapLocationType, Day, Stages } from '$types';
import { MapLocationKeys } from "$types";
export type MapLocation = { key: string, x: number, y: number, type: MapLocationType, stageIdx: number };

export default class MapModel {
	private transform = $state({ scale: 1, translation: { x: 0, y: 0 } });

	public locations: MapLocation[];
	public imageUrl: string | undefined;
	public width: number;
	public height: number;

	public contentTransform = $derived(
		`translate(${this.transform.translation.x}px, ${this.transform.translation.y}px) scale(${this.transform.scale})`
	);

	public locationTransform = $derived(
		`scale(${1 / this.transform.scale})`
	);

	constructor({ mapLocations, mapImageSrc, mapImageSize }: Day) {
		this.locations = this.buildLocations(mapLocations || [])
		this.imageUrl = mapImageSrc;
		this.width = mapImageSize ? mapImageSize[0] : 0;
		this.height = mapImageSize ? mapImageSize[1] : 0;
	}

	public ontransform({ scale, translation }: { scale: number; translation: { x: number; y: number } }) {
		this.transform = { scale, translation };
	}

	private buildLocations(locations: [MapLocationType | string, number, number][]) {
		let stageIdx = 0;
		return locations.map(([key, x, y]) => {
			if (MapLocationKeys.includes(key as MapLocationType)) {
				return { key, x, y, type: key, stageIdx: 0 } as MapLocation;
			} else {
				stageIdx = stageIdx + 1;
				return { key, x, y, type: '*stage', stageIdx } as MapLocation;
			}
		});
	}
}