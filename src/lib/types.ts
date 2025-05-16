import { z } from "zod";
import { DaySchema, ConfigDaySchema } from "$lib/schemas/day.schema.js";
import { StageSchema, ConfigStageSchema } from "$lib/schemas/stage.schema.js";
import { ArtistSchema, ArtistScheduleSchema, ConfigArtistSchema } from "$lib/schemas/artist.schema.js";
import { ScheduleSchema } from "$lib/schemas/schedule.schema.js";
import { RouteViewEnum, RouteParamsSchema } from "$lib/schemas/routeParams.schema.js";
import { ConfigSchema, ConfigOptionsSchema, OptionsSchema } from "$lib/schemas/config.schema.js";
import { ImageSchema } from "$lib/schemas/image.schema.js";
import { default as RouteModelType } from "$lib/models/RouteModel.svelte.js";
import { default as FestivalModelType } from "$lib/models/FestivalModel.svelte.js";
import { default as DayModelType } from "$lib/models/DayModel.svelte.js";
import { default as StageModelType } from "$lib/models/StageModel.svelte.js";

export type Day = z.infer<typeof DaySchema>;
export type Stage = z.infer<typeof StageSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type ArtistSchedule = z.infer<typeof ArtistScheduleSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
export type RouteParams = z.infer<typeof RouteParamsSchema>;
export type Image = z.infer<typeof ImageSchema>;

export type ConfigParams = z.infer<typeof ConfigSchema>;
export type ConfigDay = z.infer<typeof ConfigDaySchema>;
export type ConfigArtist = z.infer<typeof ConfigArtistSchema>;
export type ConfigStage = z.infer<typeof ConfigStageSchema>;
export type ConfigOptions = z.infer<typeof ConfigOptionsSchema>;

export type Days = Record<string, Day>
export type Stages = Record<string, Stage>
export type Artists = Record<string, Artist>
export type Options = z.infer<typeof OptionsSchema>;

export type RouteView = z.infer<typeof RouteViewEnum>;

export type RouteModel = RouteModelType;
export type FestivalModel = FestivalModelType;
export type DayModel = DayModelType;
export type StageModel = StageModelType;

export const MapLocationKeys = ['*stage', '*info', '*medic', '*potty'] as const;
const MapLocationKeyEnum = z.enum(MapLocationKeys);
export type MapLocationType = z.infer<typeof MapLocationKeyEnum>;

export type MapLocation = { key: string, lat: number, lng: number, type: MapLocationType, stageIdx: number, active?: boolean, href?: string };
export type TimeSlot = { time: Date, artists: Array<Artist | null> };
export type ScheduleByDate = { day: Day, stages: StageModel[], schedule: TimeSlot[] };










