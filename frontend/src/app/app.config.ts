import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem('token');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
        {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter,
        allowedDomains: ['localhost:4000/api/v1'],
        disallowedRoutes: ['http://localhost:4000/api/v1/auth/login'],},
    },
    JwtHelperService,
  ],
};
