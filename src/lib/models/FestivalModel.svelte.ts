import type { ZodIssue } from 'zod';
import type { Days, Stages, Artists, Day, Stage } from '$types';

export default class FestivalModel {

	constructor(
		public days: Days,
		public stages: Stages,
		public artists: Artists,
		public errors: ZodIssue[] = []
	) {
		this.stages = stages;
	}

	get defaultDay(): Day {
		const today = new Date().toISOString().split('T')[0];

		return this.days[today] || this.daysSorted[0];
	}

	get daysSorted(): Day[] {
		return Object.values(this.days).sort((a, b) => a.date.localeCompare(b.date));
	}

	get isValid(): boolean {
		return this.errors.length === 0 &&
			Object.entries(this.days).length > 0 &&
			Object.entries(this.stages).length > 0 &&
			Object.entries(this.artists).length > 0;
	}

	dayByDate(date: string | null): Day {
		return date && this.days[date] || this.defaultDay;
	}

	stagesByDate(date: string | null): Stage[] {
		let day = this.dayByDate(date);
		return day.stageKeys.map(key => this.stages[key]);
	}
}