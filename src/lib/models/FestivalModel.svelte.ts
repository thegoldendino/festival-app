import type { ZodIssue } from 'zod';
import type { Days, Stages, Artists, Day, ConfigOptions, Options } from '$lib/types.js';
import StageModel from '$lib/models/StageModel.svelte.js';
import DayModel from './DayModel.svelte.js';
export default class FestivalModel {

	constructor(
		public days: Days,
		public stages: Stages,
		public artists: Artists,
		public errors: ZodIssue[] = [],
		private _options?: ConfigOptions | undefined,
	) { }

	get defaultDay(): Day {
		const today = new Date().toISOString().split('T')[0];

		return this.days[today] ?? this.daysSorted[0];
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

	dayByDate(date: string | null): DayModel {
		const day = date && this.days[date] || this.defaultDay;
		return DayModel.fromDay(day);
	}

	get options(): Options {
		return {
			logoImage: this._options?.logoImage ?? { src: '' },
			responsivefullscreen: this._options?.responsivefullscreen ?? false,
			text: {
				artist: this._options?.text?.artist ?? 'Artist',
				artists: this._options?.text?.artists ?? 'Artists',
				stages: this._options?.text?.stages ?? 'Stages',
			}
		};
	}

	stage(key: string): StageModel {
		return new StageModel(this.stages[key]);
	}
}