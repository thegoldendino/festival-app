import type { MapLocationType, DayModel, MapLocation } from '$lib/types.js';
import { MapLocationKeys } from '$lib/types.js';
import type StageModel from '$lib/models/StageModel.svelte.js';

export default class MapModel {

	public locations: MapLocation[];


	constructor({ mapLocations, date }: DayModel, stages: Record<string, StageModel>) {
		this.locations = this.buildLocations(date, mapLocations || [], stages)
	}


	private buildLocations(date: string, locations: [MapLocationType | string, number, number][], stages: Record<string, StageModel>): MapLocation[] {
		let stageIdx = 0;
		return locations.map(([key, lat, lng]) => {
			if (MapLocationKeys.includes(key as MapLocationType)) {
				const href = `http://maps.google.com/?q=${lat},${lng}`;
				return { key, lat, lng, type: key, stageIdx: 0, href } as MapLocation;
			} else {
				stageIdx = stageIdx + 1;
				const href = `#/${date}/stages/${key}`
				return { key, lat, lng, type: '*stage', stageIdx, active: stages[key]?.isActive, href } as MapLocation;
			}
		});
	}
}