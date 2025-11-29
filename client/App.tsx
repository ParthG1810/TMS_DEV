// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider } from '@emotion/react';
// utils
import createEmotionCache from '../Frontend-Full/src/utils/createEmotionCache';
// theme
import ThemeProvider from '../Frontend-Full/src/theme';
// locales
import ThemeLocalization from '../Frontend-Full/src/locales';
// components
import { StyledChart } from '../Frontend-Full/src/components/chart';
import ProgressBar from '../Frontend-Full/src/components/progress-bar';
import SnackbarProvider from '../Frontend-Full/src/components/snackbar';
import { MotionLazyContainer } from '../Frontend-Full/src/components/animate';
import { ThemeSettings } from '../Frontend-Full/src/components/settings';

// Auth
import { AuthProvider } from '../Frontend-Full/src/auth/JwtContext';

// Routes
import Router from './routes';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

export default function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <AuthProvider>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <ThemeLocalization>
                <SnackbarProvider>
                  <StyledChart />
                  <ProgressBar />
                  <Router />
                </SnackbarProvider>
              </ThemeLocalization>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </AuthProvider>
    </CacheProvider>
  );
}
