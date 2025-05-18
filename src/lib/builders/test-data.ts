import type { ConfigParams, ConfigDay, ConfigStage, ConfigArtist } from '$lib/types.js';

/**
 * Test data for FestivalBuilder unit and integration tests
 */

// Basic valid configuration
export const basicValidConfig: ConfigParams = {
  days: {
    '2025-01-01': {
      startTime: '10:00:00',
      scheduleIncrement: 60,
      stages: ["stage-1", "stage-2"],
      schedule: [
        ["artist-1", "artist-2"],
        ["artist-1", "artist-4"]
      ],
    },
  },
  stages: {
    "stage-1": {
      name: "Stage 1",
      location: "47.5495806,-122.3174943"
    },
    "stage-2": {
      name: "Stage 2",
      location: "47.5497417,-122.3179972"
    },
    "stage-3": {
      name: "Stage 3",
      location: "47.549163,-122.317331"
    },
    "stage-4": {
      name: "Stage 4",
      location: "47.54856,-122.317336"
    },
  },
  artists: {
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
};

// Complex configuration with multiple days, custom options
export const complexConfig: ConfigParams = {
  days: {
    '2025-01-01': {
      startTime: '10:00:00',
      scheduleIncrement: 45,
      display: 'Day One',
      stages: ["stage-1", "stage-2"],
      schedule: [
        ["artist-1", "artist-2"],
        ["artist-3", "artist-4"],
        ["artist-5", ""]
      ],
      locations: [
        ["stage-1", "47.5495806,-122.3174943"],
        ["stage-2", "47.5497417,-122.3179972"],
        ["*info", "47.549000,-122.317400"],
        ["*medic", "47.548888,-122.317400"]
      ]
    },
    '2025-01-02': {
      startTime: '11:00:00',
      scheduleIncrement: 30,
      display: 'Day Two',
      stages: ["stage-3", "stage-4"],
      schedule: [
        ["artist-5", "artist-1"],
        ["artist-2", "artist-3"],
        ["artist-4", "artist-5"],
        ["", "artist-1"]
      ],
      unscheduledArtists: ["artist-2"]
    }
  },
  stages: {
    "stage-1": {
      name: "Main Stage",
      location: "47.5495806,-122.3174943"
    },
    "stage-2": {
      name: "Second Stage",
      location: "47.5497417,-122.3179972"
    },
    "stage-3": {
      name: "Third Stage",
      location: "47.549163,-122.317331"
    },
    "stage-4": {
      name: "Fourth Stage",
      location: "47.54856,-122.317336"
    },
  },
  artists: {
    "artist-1": {
      name: "Artist One",
      hometown: "Seattle, WA",
      description: "A fantastic musician",
      infoUrl: "https://example.com/artist1",
      image: {
        src: "/static/images/logo-white.png", // Use an existing image
        width: 300,
        height: 200
      }
    },
    "artist-2": {
      name: "Artist Two",
      hometown: "Portland, OR"
    },
    "artist-3": {
      name: "Artist Three",
      hometown: "Vancouver, BC",
      description: "Amazing performance art"
    },
    "artist-4": {
      name: "Artist Four",
      infoUrl: "https://example.com/artist4"
    },
    "artist-5": {
      name: "Artist Five",
      hometown: "San Francisco, CA",
      description: "Legendary performer",
      infoUrl: "https://example.com/artist5"
    },
  },
  options: {
    logoImage: {
      src: "/static/images/logo-white.png", // Use an existing image
      width: 100,
      height: 100
    },
    responsivefullscreen: true,
    text: {
      artist: "Performer",
      artists: "Performers",
      stages: "Venues"
    }
  }
};

// Error configurations

export const errorScheduleLength: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      schedule: [
        ["artist-1"], // Missing second element
        ["artist-1", "artist-4"]
      ],
    }
  }
};

export const errorStageKey: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      stages: ["stage-1", "stage-NONEXISTENT"],
    }
  }
};

export const errorArtistKey: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      schedule: [
        ["artist-1", "artist-2"],
        ["artist-1", "artist-NONEXISTENT"]
      ],
    }
  }
};

export const errorMapLocationKey: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      locations: [
        ["stage-1", "47.5495806,-122.3174943"],
        ["stage-NONEXISTENT", "47.5497417,-122.3179972"]
      ]
    }
  }
};

export const errorLocationFormat: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      locations: [
        ["stage-1", "invalid-format"],
        ["stage-2", "47.5497417,-122.3179972"]
      ]
    }
  }
};

// Special configuration scenarios

export const emptySlots: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      schedule: [
        ["artist-1", ""], // Empty second slot
        ["", "artist-4"] // Empty first slot
      ],
    }
  }
};

export const stringScheduleIncrement: ConfigParams = {
  ...basicValidConfig,
  days: {
    '2025-01-01': {
      ...basicValidConfig.days['2025-01-01'],
      scheduleIncrement: "45", // String instead of number
    }
  }
};