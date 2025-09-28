import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { retryInterceptor } from './interceptors/retry.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export function tokenGetter(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor,retryInterceptor,errorInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter,
          // allowedDomains: ['localhost:4000'],
          disallowedRoutes: [
            'http://localhost:4000/api/v1/auth/login',
            /http:\/\/localhost:4000\/api\/v1\/auth\/.*/ // register, refresh, etc.
          ],
          skipWhenExpired: true,      
          throwNoTokenError: false    
        }
      })
    ),
  ],
};
