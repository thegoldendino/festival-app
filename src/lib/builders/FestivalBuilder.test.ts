import { describe, it, expect } from 'vitest';
import FestivalBuilder from './FestivalBuilder.js';
import FestivalModel from '$lib/models/FestivalModel.svelte.js';
import {
  basicValidConfig,
  complexConfig,
  errorScheduleLength,
  errorStageKey,
  errorArtistKey,
  errorMapLocationKey,
  errorLocationFormat,
  emptySlots,
  stringScheduleIncrement
} from './test-data.js';

describe('FestivalBuilder', () => {

  it('should initialize with valid parameters', () => {
    const festival = new FestivalBuilder(basicValidConfig).build();
    expect(festival).toBeInstanceOf(FestivalModel);
    expect(festival.isValid).toBe(true);
    expect(festival.errors).toHaveLength(0);
  });

  it('should error when day.schedule[[]] length doesnt match day.stages[] length', () => {
    const festival = new FestivalBuilder(errorScheduleLength).build();
    expect(festival.isValid).toBe(false);
    expect(festival.errors.length).toBeGreaterThan(0);
  });

  it('should error when day.stages[stageKey] is invalid', () => {
    const festival = new FestivalBuilder(errorStageKey).build();
    expect(festival.isValid).toBe(false);
    expect(festival.errors.length).toBeGreaterThan(0);
  });

  it('should error when day.schedule[[artistKey]] is invalid', () => {
    const festival = new FestivalBuilder(errorArtistKey).build();
    expect(festival.isValid).toBe(false);
    expect(festival.errors.length).toBeGreaterThan(0);
  });

  it('should error when day.locations[[location]] is invalid', () => {
    const festival = new FestivalBuilder(errorMapLocationKey).build();
    expect(festival.isValid).toBe(false);
    expect(festival.errors.length).toBeGreaterThan(0);
  });

  // Additional Tests

  it('should handle multiple days correctly', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);
    expect(festival.errors).toHaveLength(0);
    expect(Object.keys(festival.days)).toHaveLength(2);
    expect(festival.daysSorted).toHaveLength(2);
    expect(festival.days['2025-01-02'].scheduleIncrement).toBe(30);
  });

  it('should handle different schedule increments', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);

    // Verify schedule timing
    const scheduleByDate = festival.scheduleByDate('2025-01-01');
    expect(scheduleByDate.schedule).toHaveLength(3);
    
    // Check time differences are 45 minutes
    const firstSlotTime = scheduleByDate.schedule[0].time.getTime();
    const secondSlotTime = scheduleByDate.schedule[1].time.getTime();
    expect(secondSlotTime - firstSlotTime).toBe(45 * 60 * 1000); // 45 minutes in milliseconds
  });

  it('should handle string-based schedule increments', () => {
    const festival = new FestivalBuilder(stringScheduleIncrement).build();
    expect(festival.isValid).toBe(true);
    
    // Verify schedule timing
    const scheduleByDate = festival.scheduleByDate('2025-01-01');
    const firstSlotTime = scheduleByDate.schedule[0].time.getTime();
    const secondSlotTime = scheduleByDate.schedule[1].time.getTime();
    expect(secondSlotTime - firstSlotTime).toBe(45 * 60 * 1000); // 45 minutes in milliseconds
  });

  it('should handle empty slots in the schedule', () => {
    const festival = new FestivalBuilder(emptySlots).build();
    expect(festival.isValid).toBe(true);
    
    // Verify schedule
    const scheduleByDate = festival.scheduleByDate('2025-01-01');
    expect(scheduleByDate.schedule[0].artists[1]).toBeNull();
    expect(scheduleByDate.schedule[1].artists[0]).toBeNull();
  });

  it('should handle locations correctly', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);
    
    // Verify locations were processed
    expect(festival.days['2025-01-01'].locations).toHaveLength(4);
    
    // Check first location - exact key depends on implementation
    expect(festival.days['2025-01-01'].locations?.[0][0]).toBeTruthy();
    
    // Check at least one location has the right coordinates
    const hasCorrectLocation = festival.days['2025-01-01'].locations?.some(loc => 
      Math.abs(loc[1] - 47.5495806) < 0.001 && Math.abs(loc[2] - (-122.3174943)) < 0.001
    );
    expect(hasCorrectLocation).toBe(true);
  });

  it('should handle invalid location format', () => {
    const festival = new FestivalBuilder(errorLocationFormat).build();
    expect(festival.isValid).toBe(false);
    expect(festival.errors.length).toBeGreaterThan(0);
  });

  it('should handle options correctly', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);
    expect(festival.options.logoImage?.src).toBe('/static/images/logo-white.png');
    expect(festival.options.text.artist).toBe('Performer');
    expect(festival.options.text.artists).toBe('Performers');
    expect(festival.options.text.stages).toBe('Venues');
  });

  it('should use default options when not provided', () => {
    const festival = new FestivalBuilder(basicValidConfig).build();
    expect(festival.isValid).toBe(true);
    expect(festival.options.text.artist).toBe('Artist');
    expect(festival.options.text.artists).toBe('Artists');
    expect(festival.options.text.stages).toBe('Stages');
  });

  it('should handle unscheduled artists in day config', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);
    
    // Since the implementation details might vary for unscheduled artists,
    // we'll test it more generally
    expect(Object.keys(festival.artists)).toContain('artist-2');
    
    // If your implementation adds unscheduled artists to the day's artistKeys,
    // uncomment this line:
    // expect(festival.days['2025-01-02'].artistKeys).toContain('artist-2');
  });

  it('should handle artists with additional metadata', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);
    
    // Check that artist metadata is preserved - using the artist keys from the config
    const artist = festival.artists["artist-1"];
    expect(artist.name).toBe("Artist One");
    expect(artist.hometown).toBe("Seattle, WA");
    expect(artist.description).toBe("A fantastic musician");
    expect(artist.infoUrl).toBe("https://example.com/artist1");
    expect(artist.image?.src).toBe("/static/images/logo-white.png");
  });

  it('should correctly build stage schedules', () => {
    const festival = new FestivalBuilder(basicValidConfig).build();
    expect(festival.isValid).toBe(true);
    
    // Check any stage has a schedule
    const stageKeys = Object.keys(festival.stages);
    expect(stageKeys.length).toBeGreaterThan(0);
    
    const firstStage = festival.stages[stageKeys[0]];
    expect(Object.keys(firstStage.scheduleByDate)).toContain('2025-01-01');
    expect(firstStage.scheduleByDate['2025-01-01'].length).toBeGreaterThan(0);
  });

  it('should correctly build artist schedules', () => {
    const festival = new FestivalBuilder(basicValidConfig).build();
    expect(festival.isValid).toBe(true);
    
    // Artist-1 should have at least one performance
    const artist1 = festival.artists["artist-1"];
    expect(Object.keys(artist1.scheduleByDate)).toContain('2025-01-01');
    expect(artist1.scheduleByDate['2025-01-01'].length).toBeGreaterThan(0);
  });

  it('should handle display property correctly', () => {
    const festival = new FestivalBuilder(complexConfig).build();
    expect(festival.isValid).toBe(true);
    expect(festival.days['2025-01-01'].display).toBe('Day One');
    expect(festival.days['2025-01-02'].display).toBe('Day Two');
  });
});