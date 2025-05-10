import { z } from "zod";

const baseSchema = z.object({
	startTime: z.string().time(),
	scheduleIncrement: z.coerce.number().or(z.string().regex(/^\d+$/)),
	location: z.string().optional(),
	mapUrl: z.string().url().optional(),
	mapLocations: z.array(z.tuple([z.string(), z.coerce.number(), z.coerce.number()])).default([]).optional(),
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
		startTime: z.date(),
		endTime: z.date(),
		stageKeys: z.array(z.string()),
		artistKeys: z.array(z.string()),
	})
);