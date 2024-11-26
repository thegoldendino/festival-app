import { describe, it, expect } from 'vitest';
import FestivalModel from './FestivalModel.svelte.js';
import type { ConfigArtists, ConfigStages } from '$lib/schemas/config.schema.js';
import { date } from 'zod';

describe('FestivalModel', () => {

	const daysMultiValid = {
		'2025-01-01': {
			startTime: '10:00:00',
			scheduleIncrement: 60,
			date: '2025-01-01',
			stageKeys: ["stage-1", "stage-2"],
			artistKeys: ["artist-1", "artist-2"]
		},
		'2025-01-02': {
			startTime: '10:00:00',
			scheduleIncrement: '20',
			date: '2025-01-02',
			stageKeys: ["stage-3", "stage-4"],
			artistKeys: ["artist-3", "artist-6"],
		},
	};

	it('should have a default day', () => {
		const festival = new FestivalModel(daysMultiValid, {}, {});
		expect(festival.defaultDay).not.toBe(null);
	});

	it('should have a day by date', () => {

		const festival = new FestivalModel(daysMultiValid, {}, {});
		expect(festival.dayByDate('2025-01-01')).not.toBe(null);
	});

	it('should have days sorted', () => {
		const festival = new FestivalModel(daysMultiValid, {}, {});
		expect(festival.daysSorted).not.toBe(null);
	});

});