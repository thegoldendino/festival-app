import type { Stage, Schedule } from "$lib/types.js";

export default class StageModel {
	constructor(public stage: Stage) { }

	get key(): string {
		return this.stage.key;
	}

	get name(): string {
		return this.stage.name;
	}
	get directionsUrl(): string | undefined {
		return `http://maps.google.com/?q=${this.lat},${this.lng}`;
	}

	get lat(): number {
		return this.location[0];
	}
	get lng(): number {
		return this.location[1];
	}
	get location(): [number, number] {
		return this.stage.location;
	}

	get isActive(): boolean {
		return Object.values(this.stage.scheduleByDate)
			.some((schedule) =>
				schedule.some((s) => (s.key && s.start <= new Date() && s.end >= new Date())));
	}

	scheduleByDate(date: string): Schedule {
		return this.stage.scheduleByDate[date].filter((s) => s.key);
	}
}