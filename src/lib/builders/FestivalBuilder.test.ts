import { describe, it, expect } from 'vitest';
import FestivalBuilder from './FestivalBuilder.js';
import FestivalModel from '$lib/models/FestivalModel.svelte.js';
import type { ConfigArtists, ConfigStages } from '$lib/schemas/config.schema.js';

describe('FestivalBuilder', () => {

	const daysValid = {
		'2025-01-01': {
			startTime: '10:00:00',
			endTime: '16:00:00',
			scheduleIncrement: 60,
			stages: ["stage-1", "stage-2"],
			schedule: [
				["artist-1", "artist-2"],
				["artist-1", "artist-4"]
			],
		},
	};

	const stagesValid: ConfigStages = {
		"stage-1": {
			name: "Stage 1",
		},
		"stage-2": {
			name: "Stage 2",
		},
		"stage-3": {
			name: "Stage 3",
		},
		"stage-4": {
			name: "Stage 4",
		},
	}

	const artistsValid: ConfigArtists = {
		"artist-1": {
			name: "Artist 1",
		},
		"artist-2": {
			name: "Artist 2",
		},
		"artist-3": {
			name: "Artist 3",
		},
		"artist-4": {
			name: "Artist 4",
		},
		"artist-5": {
			name: "Artist 5",
		},
	}

	it('should initialize with valid parameters', () => {
		const params = {
			days: daysValid,
			stages: stagesValid,
			artists: artistsValid,
		};
		const festival = new FestivalBuilder(params).build();
		expect(festival).toBeInstanceOf(FestivalModel);
		expect(festival.isValid).toBe(true);
		expect(festival.errors).toHaveLength(0);
	});

	const daysErrorScheduleLength = {
		'2025-01-01': {
			startTime: '10:00:00',
			endTime: '16:00:00',
			scheduleIncrement: 60,
			stages: ["stage-1", "stage-2"],
			schedule: [
				["artist-1"], // WRONG
				["artist-1", "artist-4"]
			],
		},
	};

	it('should error when day.schedule[[]] length doesnt match day.stages[] length', () => {
		const params = {
			days: daysErrorScheduleLength,
			stages: stagesValid,
			artists: artistsValid,
		};
		const festival = new FestivalBuilder(params).build();
		expect(festival.isValid).toBe(false);
		expect(festival.errors.length).toBeGreaterThan(0);
	});

	const daysErrorStageKey = {
		'2025-01-01': {
			startTime: '10:00:00',
			endTime: '16:00:00',
			scheduleIncrement: 60,
			stages: ["stage-1", "stage-WRONG"],
			schedule: [
				["artist-1", "artist-2"],
				["artist-1", "artist-4"]
			],
		},
	};

	it('should error when day.stages[stageKey] is invalid', () => {
		const params = {
			days: daysErrorStageKey,
			stages: stagesValid,
			artists: artistsValid,
		};
		const festival = new FestivalBuilder(params).build();
		expect(festival.isValid).toBe(false);
		expect(festival.errors.length).toBeGreaterThan(0);
	});

	const daysErrorArtistKey = {
		'2025-01-01': {
			startTime: '10:00:00',
			endTime: '16:00:00',
			scheduleIncrement: 60,
			stages: ["stage-1", "stage-2"],
			schedule: [
				["artist-1", "artist-2"],
				["artist-1", "artist-WRONG"]
			],
		},
	};

	it('should error when day.schedule[[artistKey]] is invalid', () => {
		const params = {
			days: daysErrorArtistKey,
			stages: stagesValid,
			artists: artistsValid,
		};
		const festival = new FestivalBuilder(params).build();
		expect(festival.isValid).toBe(false);
		expect(festival.errors.length).toBeGreaterThan(0);
	});

});