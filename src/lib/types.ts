import { z } from "zod";
import { DaySchema, MapPinEnum, ConfigDaySchema } from "./schemas/day.schema.js";
import { StageSchema, ConfigStageSchema } from "./schemas/stage.schema.js";
import { ArtistSchema, ArtistScheduleSchema, ConfigArtistSchema } from "./schemas/artist.schema.js";
import { ScheduleSchema } from "./schemas/schedule.schema.js";
import { RouteViewEnum, RouteSchema } from "./schemas/route.schema.js";
import { ConfigSchema, ConfigDaysSchema, ConfigArtistsSchema, ConfigStagesSchema } from "./schemas/config.schema.js";
import { default as RouteModelType } from "./models/RouteModel.svelte.js";
import { default as FestivalModelType } from "./models/FestivalModel.svelte.js";

export type Day = z.infer<typeof DaySchema>;
export type Stage = z.infer<typeof StageSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type ArtistSchedule = z.infer<typeof ArtistScheduleSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
export type Route = z.infer<typeof RouteSchema>;

export type ConfigParams = z.infer<typeof ConfigSchema>;
export type ConfigArtists = z.infer<typeof ConfigArtistsSchema>;
export type ConfigStages = z.infer<typeof ConfigStagesSchema>;
export type ConfigDays = z.infer<typeof ConfigDaysSchema>;
export type ConfigDay = z.infer<typeof ConfigDaySchema>;
export type ConfigArtist = z.infer<typeof ConfigArtistSchema>;
export type ConfigStage = z.infer<typeof ConfigStageSchema>;

export type Days = Record<string, Day>
export type Stages = Record<string, Stage>
export type Artists = Record<string, Artist>

export type MapPin = z.infer<typeof MapPinEnum>;
export type RouteView = z.infer<typeof RouteViewEnum>;

export type RouteModel = RouteModelType;
export type FestivalModel = FestivalModelType;










