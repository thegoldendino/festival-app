import { z } from 'zod';
import { ScheduleSchema } from './schedule.schema.js';

const baseSchema = z.object({
	name: z.string(),
	location: z.string().nullish(),
	description: z.string().nullish(),
	infoUrl: z.string().url().nullish().catch(null),
	imageUrl: z.string().url().nullish().catch(null),
	imageThumbUrl: z.string().url().nullish().catch(null),
});

export const ConfigArtistSchema = baseSchema;

export const ArtistScheduleSchema = z.record(ScheduleSchema);

export const ArtistSchema = baseSchema.merge(
	z.object({
		key: z.string(),
		scheduleByDay: ArtistScheduleSchema,
	}));

