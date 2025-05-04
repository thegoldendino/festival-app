import type { Stage, Schedule } from "$lib/types.js";

export default class StageModel {
	constructor(public stage: Stage) { }

	get key(): string {
		return this.stage.key;
	}

	get name(): string {
		return this.stage.name;
	}
	get mapUrl(): string | undefined {
		return this.stage.mapUrl;
	}

	get isActive(): boolean {
		return Object.values(this.stage.scheduleByDate)
			.some((schedule) =>
				schedule.some((s) => (s.key && s.start <= new Date() && s.end >= new Date())));
	}

	scheduleByDate(date: string): Schedule {
		return this.stage.scheduleByDate[date];
	}
}