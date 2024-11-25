import { z } from 'zod';

export const RouteViewEnum = z.enum(['map', 'stages', 'artists']);
export const RouteViewDefault = RouteViewEnum.enum.map;

export const RouteSchema = z.tuple([
	z.string().date().nullish().default(null),
	RouteViewEnum.nullish().default(RouteViewDefault),
	z.string().nullish().default(null),
]);

