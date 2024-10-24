import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import { CssBaseline, Theme, useMediaQuery } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { colorSchemes, customShadows, shadows } from './core';

// ----------------------------------------------------------------------

interface ThemeProps {
  children?: React.ReactNode;
  customTheme?: Theme;
}

export default function ThemeProvider({ children }: ThemeProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    const appTheme = createTheme({
      palette: prefersDarkMode ? colorSchemes.dark?.palette : colorSchemes.light?.palette,
      shadows: shadows(),
      customShadows: customShadows(),
    });

    return appTheme;
  }, [prefersDarkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {/* <GlobalStyles /> */}
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
