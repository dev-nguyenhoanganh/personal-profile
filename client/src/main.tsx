import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Styles
import App from './App.tsx';

// Load resources
import enMessage from '@/resources/lang/en.json';
import { IntlProvider } from 'react-intl';

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'en-US':
      return enMessage;

    default:
      return enMessage;
  }
};

const bootstrapApp = async () => {
  const locale = navigator.language;
  const messages = loadLocaleData(locale);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
        <App />
      </IntlProvider>
    </StrictMode>,
  );
};

bootstrapApp();
