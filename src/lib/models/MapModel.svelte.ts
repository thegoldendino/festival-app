import type { MapLocationType, Day, Image } from '$types';
import { MapLocationKeys } from "$types";
export type MapLocation = { key: string, x: number, y: number, type: MapLocationType, stageIdx: number };

export default class MapModel {
	private transform = $state({ scale: 1, translation: { x: 0, y: 0 } });

	public locations: MapLocation[];
	public image: Image | undefined;

	public contentTransform = $derived(
		`translate(${this.transform.translation.x}px, ${this.transform.translation.y}px) scale(${this.transform.scale})`
	);

	public locationTransform = $derived(
		`scale(${1 / this.transform.scale})`
	);

	constructor({ mapLocations, mapImage }: Day) {
		this.locations = this.buildLocations(mapLocations || [])
		this.image = mapImage;
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