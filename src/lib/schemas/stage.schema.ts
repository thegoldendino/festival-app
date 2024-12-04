import { z } from "zod";
import { ScheduleSchema } from "./schedule.schema.js";

const baseSchema = z.object({
	name: z.string(),
	mapUrl: z.string().url().optional(),
});

export const ConfigStageSchema = baseSchema;

export const StageScheduleSchema = z.record(z.string().date(), ScheduleSchema);

export const StageSchema = baseSchema.merge(
	z.object({
		key: z.string(),
		scheduleByDate: StageScheduleSchema,
	})
);

