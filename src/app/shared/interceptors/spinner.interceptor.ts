import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerSvc = inject(SpinnerService);

  // Mostrar el spinner al iniciar la solicitud
  spinnerSvc.show();

  return next(req).pipe(
    // Ocultar el spinner al finalizar la solicitud
    finalize(() => spinnerSvc.hide())
  );
};
