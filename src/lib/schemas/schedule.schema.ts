import { z } from "zod";

export const TimeSlotSchema = z.object({
	time: z.string().time(),
	key: z.string(),
})

export const ScheduleSchema = z.array(
	TimeSlotSchema
);
