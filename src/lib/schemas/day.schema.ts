import { z } from "zod";
import { StageSchema } from "./stage.schema.js";
import { ArtistSchema } from "./artist.schema.js";

export const MapPinEnum = z.enum(['info', 'medic', 'potty']);

const baseSchema = z.object({
	startTime: z.string().time(),
	scheduleIncrement: z.coerce.number().or(z.string().regex(/^\d+$/)),
	location: z.string().optional(),
	mapUrl: z.string().url().optional(),
	mapImageUrl: z.string().optional(),
	mapPins: z.array(z.tuple([MapPinEnum, z.coerce.number(), z.coerce.number()])).default([]).optional(),
});

export const ConfigDaySchema = baseSchema.merge(
	z.object({
		stages: z.array(z.string()),
		schedule: z.array(z.array(z.string())),
		unscheduledArtists: z.array(z.string()).optional()
	})
).superRefine((data, ctx) => {
	data.schedule.forEach((timeSlot) => {
		if (timeSlot.length !== data.stages.length) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Timeslot [${timeSlot.join(', ')}] (${timeSlot.length}) must have the same number of time slots as stages (${data.stages.length})`,
				path: ['schedule'],
			});
		}
	})
});

export const DaySchema = baseSchema.merge(
	z.object({
		date: z.string().date(),
		stages: z.array(StageSchema),
		artists: z.array(ArtistSchema),
		unscheduled: z.array(ArtistSchema).optional(),
	})
);