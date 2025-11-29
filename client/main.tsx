import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// redux
import { store, persistor } from '../Frontend-Full/src/redux/store';

// components
import { SettingsProvider } from '../Frontend-Full/src/components/settings';

// Check for windows global configuration
import '../Frontend-Full/src/locales/i18n';

// App
import App from './App';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </PersistGate>
  </ReduxProvider>
);
