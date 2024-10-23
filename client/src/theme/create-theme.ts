import type { Theme } from '@mui/material/styles';

import { extendTheme } from '@mui/material/styles';

import { colorSchemes } from './core';

// ----------------------------------------------------------------------

export function createTheme(): Theme {
  const initialTheme = {
    // shadows: shadows(),
    // customShadows: customShadows(),
    // components,
    // typography,
    colorSchemes,
    shape: { borderRadius: 8 },
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme);

  return theme;
}

// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function shouldSkipGeneratingVar(keys: string[], _value: string | number): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'typography',
    'breakpoints',
    'transitions',
    'cssVarPrefix',
    'unstable_sxConfig',
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  };

  const isPaletteKey = keys[0] === 'palette';

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}
