import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, delay, retry, retryWhen, scan, throwError } from 'rxjs';
  const maxTries = 3;
  const retryStatuses = [0,408,429,500,502,503,504];

function shouldRetry(error:any):boolean{
  return retryStatuses.includes(error.status)
}

export const retryInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
   retryWhen(errors =>
      errors.pipe(
        scan((retryCount, error) => {
          if (shouldRetry(error) && retryCount < maxTries) {
            return retryCount + 1;
          } else {
            throw error; 
          }
        }, 0),
        delay(1000) 
      )
    ),
    catchError(error => {
      console.error(`Request failed after ${maxTries} retries:`, error);
      return throwError(() => error);
    })
  )
};
