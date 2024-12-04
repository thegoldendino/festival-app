import type { Stage, Day, Stages } from '$types';


export type MapLocationKeys = '_info' | '_medic' | '_potty';
export type MapLocation = { key: string, x: number, y: number, type: '_misc' | '_stage', stageIdx: number };

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

	constructor({ mapLocations, mapImageUrl, mapImageSize }: Day, stages: Stages) {
		this.locations = this.buildLocations(mapLocations || [])
		this.imageUrl = mapImageUrl;
		this.width = mapImageSize ? mapImageSize[0] : 0;
		this.height = mapImageSize ? mapImageSize[1] : 0;
	}

	public ontransform({ scale, translation }: { scale: number; translation: { x: number; y: number } }) {
		this.transform = { scale, translation };
	}

	private buildLocations(locations: [string, number, number][]) {
		let stageIdx = 0;
		return locations.map(([key, x, y]) => {
			if (['_info', '_medic', '_potty'].includes(key)) {
				return { key, x, y, type: '_misc', stageIdx: 0 } as MapLocation;
			} else {
				stageIdx = stageIdx + 1;
				return { key, x, y, type: '_stage', stageIdx } as MapLocation;
			}
		});
	}
}