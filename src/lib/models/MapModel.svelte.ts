import type { MapLocationType, DayModel, MapLocation } from '$lib/types.js';
import { MapLocationKeys } from '$lib/types.js';
import type StageModel from '$lib/models/StageModel.svelte.js';

export default class MapModel {

	public locations: MapLocation[];


	constructor({ locations, date }: DayModel, stages: Record<string, StageModel>) {
		this.locations = this.buildLocations(date, locations || [], stages)
	}


	private buildLocations(date: string, locations: [MapLocationType | string, number, number][], stages: Record<string, StageModel>): MapLocation[] {
		const dayLocations = locations.map(([key, lat, lng]) => {
			if (MapLocationKeys.includes(key as MapLocationType)) {
				const href = `http://maps.google.com/?q=${lat},${lng}`;
				return { key, lat, lng, type: key, stageIdx: 0, href } as MapLocation;
			}
		});
		const stageLocations = Object.entries(stages).map(([key, stage], idx) => {
			if (stage.location) {
				const [lat, lng] = stage.location;
				const href = `#/${date}/stages/${key}`
				return { key, lat, lng, type: '*stage', stageIdx: idx + 1, active: stages[key]?.isActive, href } as MapLocation;
			}
		});
		return [...dayLocations, ...stageLocations].filter(Boolean) as MapLocation[];
	}
}