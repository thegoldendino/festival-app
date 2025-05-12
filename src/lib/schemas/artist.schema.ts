import { z } from 'zod';
import { ScheduleSchema } from './schedule.schema.js';
import { ImageSchema } from './image.schema.js';

const baseSchema = z.object({
	name: z.string(),
	hometown: z.string().optional(),
	description: z.string().optional(),
	infoUrl: z.string().url().optional(),
	image: ImageSchema.optional(),
});

export const ConfigArtistSchema = baseSchema;

export const ArtistScheduleSchema = z.record(z.string().date(), ScheduleSchema);

export const ArtistSchema = baseSchema.merge(
	z.object({
		key: z.string(),
		scheduleByDate: ArtistScheduleSchema,
	})
);

