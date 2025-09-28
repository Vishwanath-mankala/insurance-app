import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// const jwtHelper = new JwtHelperService();
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const jwtHelper = inject(JwtHelperService); 
  const excludedUrls = ['/api/v1/auth'];
  const shouldSkip = excludedUrls.some((url) => req.url.includes(url));
  if (token && !shouldSkip && !jwtHelper.isTokenExpired(token)) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(cloned);
  }
  return next(req);
};
