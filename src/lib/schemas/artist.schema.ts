import { z } from 'zod';
import { ScheduleSchema } from './schedule.schema.js';

const baseSchema = z.object({
	name: z.string(),
	location: z.string().optional(),
	description: z.string().optional(),
	infoUrl: z.string().url().optional(),
	imageUrl: z.string().url().optional(),
	imageThumbUrl: z.string().url().optional(),
});

export const ConfigArtistSchema = baseSchema;

export const ArtistScheduleSchema = z.record(z.string().date(), ScheduleSchema);

export const ArtistSchema = baseSchema.merge(
	z.object({
		key: z.string(),
		scheduleByDate: ArtistScheduleSchema,
	})
);

