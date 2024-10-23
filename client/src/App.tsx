import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from '@/theme';
import { AppRoutes } from '@/routes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
