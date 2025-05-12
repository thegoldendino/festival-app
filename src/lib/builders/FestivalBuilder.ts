import type { ZodIssue, SafeParseReturnType } from 'zod';
import { ConfigSchema } from '$lib/schemas/config.schema.js';
import type { Days, Stages, Artists, Day, Schedule, ConfigParams, ConfigDay } from '$lib/types.js';
import { newDate, shortTime } from '$lib/utils/dateFormat.js';
import FestivalModel from '$lib/models/FestivalModel.svelte.js';

export default class FestivalBuilder {
	private config: SafeParseReturnType<ConfigParams, ConfigParams>;

	constructor(params: ConfigParams) {
		this.config = ConfigSchema.safeParse(params);
	}

	public build(): FestivalModel {
		if (!this.config.data) {
			return new FestivalModel({}, {}, {}, this.errors);
		}

		const artists = this.importArtists(this.config.data);
		const days = this.importDays(this.config.data);
		const stages = this.importStages(this.config.data, days);
		const options = this.config.data.options;

		return new FestivalModel(
			days, stages, artists, this.errors, options,
		);
	}

	get isValid(): boolean {
		return this.config.success;
	}

	get errors(): ZodIssue[] {
		return this.config.error && this.config.error.issues || [];
	}

	private importDays({ days }: ConfigParams): Days {
		return Object.entries(days).reduce((acc: Days, [date, day]) => {
			acc[date] = {
				...day,
				date,
				locations: day.locations?.map(this.parseLocation),
				startTime: newDate(date, day.startTime),
				endTime: this.calcEndTime(date, day.startTime, day.scheduleIncrement, day.schedule.length),
				stageKeys: day.stages,
				artistKeys:
					day.schedule
						.flat()
						.filter((key, idx, arr) => arr.indexOf(key) === idx)
						.filter(Boolean)
			};
			return acc;
		}, {})
	}

	private parseLocation(location: [string, string]): [string, number, number] {
		const key = location[0]
		const [lat, lng] = location[1].split(',').map(Number);
		return [key, lat, lng];
	}

	private calcEndTime(date: string, startTime: string, scheduleIncrement: number | string, scheduleLength: number): Date {
		const endTime = newDate(date, startTime);
		endTime.setMinutes(endTime.getMinutes() + scheduleLength * Number(scheduleIncrement));
		return endTime
	}

	private importStages({ days, stages }: ConfigParams, processedDays: Days): Stages {
		const processedStages = Object.entries(stages).reduce(
			(acc: Stages, [key, stage]) => {
				const [lat, lng] = stage.location.split(',').map(Number);
				acc[key] = {
					key,
					name: stage.name,
					location: [lat, lng],
					scheduleByDate: {},
				};
				return acc;
			}, {});

		Object.entries(days).forEach(([date, day]) => {
			day.stages.forEach((stageKey, idx) => {
				if (processedStages[stageKey]) {
					processedStages[stageKey].scheduleByDate[date] =
						Object.entries(day.schedule).map(([scheduleIdx, artistKeys]) => {
							const artistKey = artistKeys[idx];
							const startTime = newDate(date, day.startTime);
							startTime.setMinutes(startTime.getMinutes() + Number(scheduleIdx) * Number(day.scheduleIncrement));
							const endTime = newDate(date, day.startTime);
							endTime.setMinutes(startTime.getMinutes() + Number(day.scheduleIncrement));
							return {
								key: artistKey,
								start: startTime,
								end: endTime,
							};
						});
				}
			});
		});

		return processedStages;
	}

	private importArtists({ days, artists }: ConfigParams): Artists {
		return Object.entries(artists).reduce((acc: Artists, [key, artist]) => {
			acc[key] = { ...artist, key, scheduleByDate: this.importArtistSchedule(days, key) };
			return acc;
		}, {})
	}

	private importArtistSchedule(days: Record<string, ConfigDay>, artistKey: string): Record<string, Schedule> {
		return Object.entries(days).reduce((acc: Record<string, Schedule>, [date, day]) => {
			let processedSchedule: Schedule = [];
			Object.entries(day.schedule).forEach(([slotidx, artistKeys]) => {
				const start = newDate(date, day.startTime)
				start.setMinutes(start.getMinutes() + Number(slotidx) * Number(day.scheduleIncrement));
				const end = newDate(date, day.startTime);
				end.setMinutes(start.getMinutes() + Number(day.scheduleIncrement));
				artistKeys.forEach((key, idx) => {
					if (artistKey === key) {
						processedSchedule.push({
							key: day.stages[idx],
							start,
							end,
						});
					}
				});
			});
			acc[date] = processedSchedule
			return acc;
		}, {});
	}
}