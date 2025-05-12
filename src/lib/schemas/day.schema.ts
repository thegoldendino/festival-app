import { z } from "zod";

const baseSchema = z.object({
	startTime: z.string().time(),
	scheduleIncrement: z.coerce.number().or(z.string().regex(/^\d+$/)),
	display: z.string().optional(),
	locations: z.array(z.tuple([z.string(), z.string()])).default([]).optional(),
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
	});

	data.locations?.forEach(([key, latlng]) => {
		const [lat, lng] = latlng.split(',').map(Number);
		if (isNaN(lat) || isNaN(lng)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Location ${key} "${lat},${lng}" is not a valid lat,lng`,
			});
		}
	});
});

export const DaySchema = baseSchema.merge(
	z.object({
		date: z.string().date(),
		startTime: z.date(),
		endTime: z.date(),
		stageKeys: z.array(z.string()),
		artistKeys: z.array(z.string()),
		locations: z.array(z.tuple([z.string(), z.number(), z.number()])).default([]).optional(),
	})
);