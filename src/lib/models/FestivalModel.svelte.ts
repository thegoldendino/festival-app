import type { ZodIssue } from 'zod';
import type { Days, Stages, Artists, Day, ConfigOptions, Options, TimeSlot, Stage } from '$lib/types.js';
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

	dayByDate(date: string | null): DayModel {
		const day = date && this.days[date] || this.defaultDay;
		return DayModel.fromDay(day);
	}

	stage(key: string): StageModel {
		return new StageModel(this.stages[key]);
	}

	scheduleByDate(date: string | null): { stages: Stage[], schedule: TimeSlot[] } {
		const schedule: TimeSlot[] = [];
		const day = date && this.days[date] || this.defaultDay;
		const stages = day.stageKeys.map((key) => this.stages[key])
		const startTime = new Date(day.startTime);
		const endTime = new Date(day.endTime);
		const increment = Number(day.scheduleIncrement);
		let row = 0;

		for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + increment)) {
			const timeSlot: TimeSlot = { time: new Date(time), artists: [] };

			stages.forEach((stage) => {
				const artistKey = stage.scheduleByDate[day.date][row]?.key;
				if (artistKey && this.artists[artistKey]) {
					timeSlot.artists.push(this.artists[artistKey]);
				} else {
					timeSlot.artists.push(null)
				}
			});
			schedule.push(timeSlot);
			row++;
		}

		return { stages, schedule };
	}
}
