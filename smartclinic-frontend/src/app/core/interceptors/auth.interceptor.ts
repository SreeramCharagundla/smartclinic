import { HttpInterceptorFn } from '@angular/common/http';

const AUTH_PREFIX = 'Bearer ';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('smartclinic_token');

  if (!token || req.url.includes('/auth/')) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `${AUTH_PREFIX}${token}`,
      },
    })
  );
};
