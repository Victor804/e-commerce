import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { Configuration } from './core/api/openapi';
import { provideApi } from './core/api/openapi/provide-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApi(
      new Configuration({
        basePath: 'http://localhost:8080',
      })
    ),
  ],
};
