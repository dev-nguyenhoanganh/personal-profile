import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from '@/theme';
import { AppRoutes } from '@/routes';
import { SnackbarProvider } from '@/components/snackbar';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <AppRoutes />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
