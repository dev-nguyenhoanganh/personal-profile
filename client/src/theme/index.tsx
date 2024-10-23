import { CssBaseline, Theme } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';

// ----------------------------------------------------------------------

interface ThemeProps {
  children?: React.ReactNode;
  customTheme?: Theme;
}

export default function ThemeProvider({ customTheme, children }: ThemeProps) {
  const theme = createTheme();

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={customTheme ?? theme}>
        <CssBaseline />
        {/* <GlobalStyles /> */}
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
