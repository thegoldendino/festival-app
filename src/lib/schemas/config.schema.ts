import { z } from 'zod';
import { ConfigArtistSchema } from './artist.schema.js';
import { ConfigDaySchema } from './day.schema.js';
import { ConfigStageSchema } from './stage.schema.js';

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

	Object.entries(data.days).forEach(([key, day]) => {
		day.stages.forEach(stageKey => {
			!stageKey.trim().length || stageKeys.includes(stageKey) ||
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_enum_value,
					options: stageKeys,
					path: ['days', key, 'stages'],
					message: `Missing stage data for key: ${stageKey}`,
					received: stageKey,
				});
		});

		day.schedule.flat().forEach(artistKey => {
			!artistKey.trim().length || artistKeys.includes(artistKey) ||
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_enum_value,
					options: artistKeys,
					path: ['days', key, 'schedule'],
					message: `Missing artist data for key: ${artistKey}`,
					received: artistKey,
				});
		});
	});
});

export type ConfigParams = z.infer<typeof ConfigSchema>;
export type ConfigDays = z.infer<typeof ConfigDaysSchema>;
export type ConfigStages = z.infer<typeof ConfigStagesSchema>;
export type ConfigArtists = z.infer<typeof ConfigArtistsSchema>;


