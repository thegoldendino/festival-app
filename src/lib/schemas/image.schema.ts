import { z } from 'zod';

export const ImageSchema = z.object({
	src: z.string(),
	width: z.number().optional(),
	height: z.number().optional(),
	format: z.string().optional(),
});