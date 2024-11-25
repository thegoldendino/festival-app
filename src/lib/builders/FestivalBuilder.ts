
import type { ZodIssue, SafeParseReturnType } from 'zod';
import { ConfigSchema } from '$lib/schemas/config.schema.js';
import type { Days, Stages, Artists, Day, Schedule, ConfigParams, ConfigDays } from '$types';
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
		return new FestivalModel(
			this.importDays(this.config.data),
			this.importStages(this.config.data),
			this.importArtists(this.config.data),
			this.errors
		);
	}

	get isValid(): boolean {
		return this.config.success;
	}

	get errors(): ZodIssue[] {
		return this.config.error && this.config.error.issues || [];
	}

	private importDays({ days }: ConfigParams): Days {
		return Object.entries(days).reduce((acc: Days, [key, day]) => {
			acc[key] = {
				...day,
				date: key,
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

	private importStages({ days, stages }: ConfigParams): Stages {
		const processedStages = Object.entries(stages).reduce(
			(acc: Stages, [key, stage]) => {
				acc[key] = {
					key,
					name: stage.name,
					mapUrl: stage.mapUrl,
					pinEl: null,
					x: stage.x,
					y: stage.y,
					schedule: [],
				};
				return acc;
			}, {});

		Object.values(days).forEach(day => {
			day.stages.forEach((stageKey, idx) => {
				if (processedStages[stageKey]) {
					processedStages[stageKey].schedule =
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
			acc[key] = { ...artist, key, scheduleByDay: this.importArtistSchedule(days, key) };
			return acc;
		}, {})
	}

	private importArtistSchedule(days: ConfigDays, artistKey: string): Record<string, Schedule> {
		return Object.entries(days).reduce((acc: Record<string, Schedule>, [key, day]) => {
			let processedSchedule: Schedule = [];
			Object.entries(day.schedule).forEach(([time, artistKeys]) => {
				artistKeys.forEach((key, idx) => {
					if (artistKey === key) {
						processedSchedule.push({
							time: time,
							key: day.stages[idx]
						});
					}
				});
			});
			acc[key] = processedSchedule
			return acc;
		}, {});
	}
}