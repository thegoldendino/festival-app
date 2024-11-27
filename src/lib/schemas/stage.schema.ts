import { z } from "zod";
import { ScheduleSchema } from "./schedule.schema.js";

const baseSchema = z.object({
	name: z.string(),
	mapUrl: z.string().url().optional(),
	x: z.number().default(0).optional(),
	y: z.number().default(0).optional(),
});

export const ConfigStageSchema = baseSchema;

export const StageSchema = baseSchema.merge(
	z.object({
		key: z.string(),
		schedule: ScheduleSchema.default([]).optional(),
	})
);

