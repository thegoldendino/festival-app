import { z } from "zod";

export const TimeSlotSchema = z.object({
	start: z.date(),
	end: z.date(),
	key: z.string(),
})

export const ScheduleSchema = z.array(
	TimeSlotSchema
);
