export const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const TEAL = '#0DB893';
export const TEAL_LIGHT = '#E8F8F4';
export const TEAL_BG = '#F0FBF8';

// Semantic aliases
export const GREEN = TEAL;
export const GREEN_LIGHT = TEAL_LIGHT;
export const GREEN_BG = TEAL_BG;

export const BLUE = '#2563EB';
export const BLUE_LIGHT = '#EFF6FF';
export const BLUE_MID = '#DBEAFE';
export const BLUE_BG = '#F0F6FF';

export const PURPLE = '#7C3AED';
export const PURPLE_LIGHT = '#F5F3FF';
export const PURPLE_BG = '#F8F6FF';

export const STEP_THEMES = {
  1: { accent: TEAL, light: TEAL_LIGHT, bg: TEAL_BG },
  2: { accent: TEAL, light: TEAL_LIGHT, bg: TEAL_BG },
  3: { accent: BLUE, light: BLUE_LIGHT, bg: BLUE_BG },
} as const;

export const MISSING_STEPS = [
  {
    id: 1,
    label: 'Person',
    emoji: '👤',
    cardTitle: 'Person Information',
    cardSub: 'Details about the missing person',
  },
  {
    id: 2,
    label: 'Reporter',
    emoji: '📋',
    cardTitle: 'Reporter Information',
    cardSub: 'Your contact details',
  },
  {
    id: 3,
    label: 'Last Seen',
    emoji: '📍',
    cardTitle: 'Last Seen Information',
    cardSub: 'When and where were they last seen?',
  },
] as const;

// Simple stepper steps used by the missing form stepper indicator
export const STEPS = [
  { id: 1, label: 'Person', icon: '👤' },
  { id: 2, label: 'Reporter', icon: '📋' },
  { id: 3, label: 'Last Seen', icon: '📍' },
];

// Dashboard feature cards
export const FEATURES = [
  {
    icon: 'navigate' as const,
    title: 'Location',
    description: 'Open GPS tracking and copy coordinates.',
    accent: BLUE,
    accentBg: BLUE_BG,
    accentLight: BLUE_LIGHT,
    route: '/location' as const,
  },
  {
    icon: 'person-add' as const,
    title: 'Missing Person',
    description: 'Register a missing person report.',
    accent: GREEN,
    accentBg: GREEN_BG,
    accentLight: GREEN_LIGHT,
    route: '/missing' as const,
  },
  {
    icon: 'list' as const,
    title: 'Missing List',
    description: 'View all registered missing person cases.',
    accent: PURPLE,
    accentBg: PURPLE_BG,
    accentLight: PURPLE_LIGHT,
    route: '/missing-list' as const,
  },
] as const;


