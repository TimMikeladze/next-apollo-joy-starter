import isDev from './is/isDev';

export const APP_VERSION = isDev() ? `x.x.x` : process.env.NEXT_PUBLIC_VERSION;

export const DEFAULT_DEBOUNCE_RATE = 300;
