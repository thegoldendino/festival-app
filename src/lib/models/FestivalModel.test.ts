import { describe, it, expect } from 'vitest';
import FestivalModel from './FestivalModel.svelte.js';
import type { ConfigArtists, ConfigStages } from '$lib/schemas/config.schema.js';
import { date } from 'zod';

describe('FestivalModel', () => {

	const stage1 = {
		name: 'Stage 1',
		key: 'stage-1',
	}

	const stage2 = {
		name: 'Stage 2',
		key: 'stage-2',
	}

	const artist1 = {
		name: 'Artist 1',
		key: 'artist-1',
		scheduleByDay: {}
	}

	const artist2 = {
		name: 'Artist 2',
		key: 'artist-2',
		scheduleByDay: {}
	}

	const daysMultiValid = {
		'2025-01-01': {
			startTime: '10:00:00',
			scheduleIncrement: 60,
			date: '2025-01-01',
			stages: [stage1, stage2],
			artists: [artist1, artist2],
		},
		'2025-01-02': {
			startTime: '10:00:00',
			scheduleIncrement: 20,
			date: '2025-01-02',
			stages: [stage1, stage2],
			artists: [artist1, artist2],
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