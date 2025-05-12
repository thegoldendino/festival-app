import { z } from "zod";
import { ScheduleSchema } from "./schedule.schema.js";

const baseSchema = z.object({
	name: z.string(),
	location: z.string(),
});

export const ConfigStageSchema = baseSchema.superRefine((data, ctx) => {
	const [lat, lng] = data.location.split(',').map(Number);
	if (isNaN(lat) || isNaN(lng)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Location ${data.location} "${lat},${lng}" is not a valid lat,lng`,
		});
	}
});

export const StageScheduleSchema = z.record(z.string().date(), ScheduleSchema);

export const StageSchema = baseSchema.merge(
	z.object({
		key: z.string(),
		scheduleByDate: StageScheduleSchema,
		location: z.tuple([z.number(), z.number()]),
	})
);

