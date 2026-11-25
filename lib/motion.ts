import tokens from '@/tokens/tokens.json';

export const ease = tokens.motion.ease as [number, number, number, number];

export const duration = {
  fast: tokens.motion.duration.fast / 1000,
  base: tokens.motion.duration.base / 1000,
  slow: tokens.motion.duration.slow / 1000,
} as const;
