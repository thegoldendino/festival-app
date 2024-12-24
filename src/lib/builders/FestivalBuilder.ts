
import type { ZodIssue, SafeParseReturnType } from 'zod';
import { ConfigSchema } from '$lib/schemas/config.schema.js';
import type { Days, Stages, Artists, Day, Schedule, ConfigParams, ConfigDays } from '$types';
import { newDate, shortTime } from '$utils/dateFormat.js';
import FestivalModel from '$lib/models/FestivalModel.svelte.js';

export default class FestivalBuilder {
	private config: SafeParseReturnType<ConfigParams, ConfigParams>;

	constructor(params: ConfigParams) {
		this.config = ConfigSchema.safeParse(params);
	}

	public build(): FestivalModel {
		if (!this.config.data) {
			return new FestivalModel({}, {}, {}, {}, this.errors);
		}

		const stages = this.importStages(this.config.data);
		const artists = this.importArtists(this.config.data);
		const days = this.importDays(this.config.data, stages, artists);
		const options = this.config.data.options;

		return new FestivalModel(
			days, stages, artists, options,
			this.errors
		);
	}

	get isValid(): boolean {
		return this.config.success;
	}

	get errors(): ZodIssue[] {
		return this.config.error && this.config.error.issues || [];
	}

	private importDays({ days }: ConfigParams, stages: Stages, artists: Artists): Days {
		return Object.entries(days).reduce((acc: Days, [key, day]) => {
			acc[key] = {
				...day,
				date: key,
				endTime: this.calcEndTime(day.startTime, day.scheduleIncrement, day.schedule),
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

	private calcEndTime(startTime: string, scheduleIncrement: number | string, schedule: string[][]): string {
		const [hours, minutes, seconds] = startTime.split(':').map(Number);
		const increment = Number(scheduleIncrement);
		const totalMinutes = schedule.reduce((acc, timeSlot) => acc + timeSlot.length, 0) * increment;
		const totalHours = Math.floor(totalMinutes / 60);
		const totalMinutesRemainder = totalMinutes % 60;
		const newMinutes = minutes + totalMinutesRemainder;
		const newHours = hours + totalHours;
		const newHoursWithMinutes = newHours + Math.floor(newMinutes / 60);
		const newMinutesRemainder = newMinutes % 60;
		const newHoursRemainder = newHoursWithMinutes % 24;
		return `${String(newHoursRemainder).padStart(2, '0')}:${String(newMinutesRemainder).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	private importStages({ days, stages }: ConfigParams): Stages {
		const processedStages = Object.entries(stages).reduce(
			(acc: Stages, [key, stage]) => {
				acc[key] = {
					key,
					name: stage.name,
					mapUrl: stage.mapUrl,
					scheduleByDate: {},
				};
				return acc;
			}, {});

		Object.entries(days).forEach(([date, day]) => {
			day.stages.forEach((stageKey, idx) => {
				if (processedStages[stageKey]) {
					processedStages[stageKey].scheduleByDate[date] =
						Object.entries(day.schedule).map(([time, artistKeys]) => {
							const artistKey = artistKeys[idx];
							return {
								time: time,
								key: artistKey
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

	private importArtistSchedule(days: ConfigDays, artistKey: string): Record<string, Schedule> {
		return Object.entries(days).reduce((acc: Record<string, Schedule>, [date, day]) => {
			let processedSchedule: Schedule = [];
			Object.entries(day.schedule).forEach(([slotidx, artistKeys]) => {
				const start = newDate(date, day.startTime)
				start.setMinutes(start.getMinutes() + Number(slotidx) * Number(day.scheduleIncrement));
				artistKeys.forEach((key, idx) => {
					if (artistKey === key) {
						processedSchedule.push({
							time: shortTime(start),
							key: day.stages[idx]
						});
					}
				});
			});
			acc[date] = processedSchedule
			return acc;
		}, {});
	}
}