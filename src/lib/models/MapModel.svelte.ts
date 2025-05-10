import type { MapLocationType, Day } from '$lib/types.js';
import { MapLocationKeys } from '$lib/types.js';
import type StageModel from '$lib/models/StageModel.svelte.js';
export type MapLocation = { key: string, lat: number, lng: number, type: MapLocationType, stageIdx: number, active?: boolean };

export default class MapModel {

	public locations: MapLocation[];


	constructor({ mapLocations }: Day, stages: Record<string, StageModel>) {
		this.locations = this.buildLocations(mapLocations || [], stages)
	}


	private buildLocations(locations: [MapLocationType | string, number, number][], stages: Record<string, StageModel>): MapLocation[] {
		let stageIdx = 0;
		return locations.map(([key, lat, lng]) => {
			if (MapLocationKeys.includes(key as MapLocationType)) {
				return { key, lat, lng, type: key, stageIdx: 0 } as MapLocation;
			} else {
				stageIdx = stageIdx + 1;
				return { key, lat, lng, type: '*stage', stageIdx, active: stages[key]?.isActive } as MapLocation;
			}
		});
	}
}