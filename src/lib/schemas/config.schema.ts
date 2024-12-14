import { z } from 'zod';
import { ConfigArtistSchema } from './artist.schema.js';
import { ConfigDaySchema } from './day.schema.js';
import { ConfigStageSchema } from './stage.schema.js';
import { MapLocationKeys, type MapLocationType } from '$types';

export const ConfigStagesSchema = z.record(
	z.string(),
	ConfigStageSchema
)

export const ConfigArtistsSchema = z.record(
	z.string(),
	ConfigArtistSchema
)

export const ConfigDaysSchema = z.record(
	z.string().date(),
	ConfigDaySchema
);

export const ConfigSchema = z.object({
	logoUrl: z.string().url().optional(),
	days: ConfigDaysSchema,
	stages: ConfigStagesSchema,
	artists: ConfigArtistsSchema,
}).superRefine((data, ctx) => {
	const artistKeys = Object.keys(data.artists);
	const stageKeys = Object.keys(data.stages);

	Object.entries(data.days).forEach(([date, day]) => {
		day.stages.forEach(stageKey => {
			!stageKey.trim().length || stageKeys.includes(stageKey) ||
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_enum_value,
					options: stageKeys,
					path: ['days', date, 'stages'],
					message: `Missing stage data for key: ${stageKey}`,
					received: stageKey,
				});
		});

		day.schedule.flat().forEach(artistKey => {
			!artistKey.trim().length || artistKeys.includes(artistKey) ||
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_enum_value,
					options: artistKeys,
					path: ['days', date, 'schedule'],
					message: `Missing artist data for key: ${artistKey}`,
					received: artistKey,
				});
		});

		day.mapLocations && day.mapLocations.forEach(([mapLocation]) => {
			!mapLocation.trim().length || stageKeys.includes(mapLocation) || MapLocationKeys.includes(mapLocation as MapLocationType) ||
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_enum_value,
					options: artistKeys,
					path: ['days', date, 'mapLocations', mapLocation],
					message: `Missing stage or location data for key: ${mapLocation}`,
					received: mapLocation,
				});
		});

	});
});

export type ConfigParams = z.infer<typeof ConfigSchema>;
export type ConfigDays = z.infer<typeof ConfigDaysSchema>;
export type ConfigStages = z.infer<typeof ConfigStagesSchema>;
export type ConfigArtists = z.infer<typeof ConfigArtistsSchema>;


