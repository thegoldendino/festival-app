import { z } from 'zod';

export const RouteViewEnum = z.enum(['map', 'stages', 'artists']);
export const RouteViewDefault = RouteViewEnum.enum.map;

export const RouteParamsSchema = z.tuple([
	z.string().date().optional(),
	RouteViewEnum.optional(),
	z.string().optional(),
]);

