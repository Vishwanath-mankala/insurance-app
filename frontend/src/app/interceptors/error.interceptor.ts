import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

function extractMessage(err: HttpErrorResponse): string {
  // Common API shapes: { message }, { error: { message } }, validation arrays, etc.
  const data = err?.error;
  if (!data) return err.message || 'Unexpected error';

  if (typeof data === 'string') return data;
  if (data.message) return data.message;

  // NestJS/Express class-validator style: { message: string[] }
  if (Array.isArray(data?.message)) return data.message.join('\n');

  // Laravel-like: { errors: { field: [msgs] } }
  if (data.errors && typeof data.errors === 'object') {
    const lines: string[] = [];
    for (const key of Object.keys(data.errors)) {
      const val = data.errors[key];
      if (Array.isArray(val)) lines.push(`${key}: ${val.join(', ')}`);
    }
    if (lines.length) return lines.join('\n');
  }

  return JSON.stringify(data);
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notifier = inject(NotificationService);

  return next(req).pipe(
    catchError((err: unknown) => {
      // Not an HttpErrorResponse (could be CORS or client error)
      if (!(err instanceof HttpErrorResponse)) {
        if (isDevMode()) console.error('[HTTP] non-HTTP error', err);
        notifier.error('Something went wrong. Please try again.');
        return throwError(() => err);
      }

      // Network/CORS/offline
      if (err.status === 0) {
        if (isDevMode()) console.error('[HTTP] Network error', err);
        notifier.error('Network error. Check your connection and try again.');
        return throwError(() => err);
      }

      // Handle by status
      switch (err.status) {
        case 400: {
          if (isDevMode()) console.warn('[HTTP 400]', err);
          notifier.warn(extractMessage(err));
          break;
        }
        case 401: {
          // Token missing/expired. Clear storage and redirect to login.
          localStorage.removeItem('token');
          notifier.info('Your session expired. Please sign in again.');
          router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
          break;
        }
        case 403: {
          notifier.warn('You don’t have permission to perform this action.');
          break;
        }
        case 404: {
          notifier.warn('Resource not found.');
          // optionally: router.navigate(['/not-found']);
          break;
        }
        case 422: {
          notifier.warn(extractMessage(err)); // validation errors
          break;
        }
        default: {
          if (err.status >= 500) {
            notifier.error('Server error. Please try again later.');
            if (isDevMode()) console.error('[HTTP 5xx]', err);
          } else {
            notifier.error(extractMessage(err));
          }
        }
      }

      // Always rethrow so callers can still handle if they want
      return throwError(() => err);
    })
  );
};
