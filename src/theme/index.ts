import { extendTheme } from '@mui/joy';

import { Inter } from '@next/font/google';

export const appFont = Inter({
  // eslint-disable-next-line @typescript-eslint/quotes
  subsets: ['latin'],
});

export const appTheme = extendTheme({});
