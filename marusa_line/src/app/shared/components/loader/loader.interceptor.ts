import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  if (req.url.includes('Product/like-post')) {
    return next(req);
  }

  loader.show();
  return next(req).pipe(
    finalize(() => loader.hide())
  );
};
