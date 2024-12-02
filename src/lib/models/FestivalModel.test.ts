import { describe, it, expect } from 'vitest';
import FestivalModel from './FestivalModel.svelte.js';
import type { ConfigArtists, ConfigStages } from '$lib/schemas/config.schema.js';
import { date } from 'zod';

describe('FestivalModel', () => {

	const stage1 = {
		name: 'Stage 1',
		key: 'stage-1',
		scheduleByDate: {}
	}

	const stage2 = {
		name: 'Stage 2',
		key: 'stage-2',
		scheduleByDate: {}
	}

	const artist1 = {
		name: 'Artist 1',
		key: 'artist-1',
		scheduleByDate: {}
	}

	const artist2 = {
		name: 'Artist 2',
		key: 'artist-2',
		scheduleByDate: {}
	}

	const daysMultiValid = {
		'2025-01-01': {
			startTime: '10:00:00',
			scheduleIncrement: 60,
			date: '2025-01-01',
			stageKeys: ['stage-1', 'stage-2'],
			artistKeys: ['artist-1', 'artist-2'],
		},
		'2025-01-02': {
			startTime: '10:00:00',
			scheduleIncrement: 20,
			date: '2025-01-02',
			stageKeys: ['stage-1', 'stage-2'],
			artistKeys: ['artist-1', 'artist-2'],
		}
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