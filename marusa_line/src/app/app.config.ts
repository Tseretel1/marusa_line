import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { loaderInterceptor } from './shared/components/loader/loader.interceptor';
import { httpInterceptor } from '../http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),                 
    importProvidersFrom(HttpClientModule), 
    provideHttpClient(withInterceptors([loaderInterceptor,httpInterceptor]))
  ]
};
