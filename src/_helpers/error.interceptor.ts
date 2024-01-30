import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@app/_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {
          /*
            if (err.status === 401 && [10, 11].includes(err.error.errorCode)) {
              const user = this.authService.userValue;
              console.log('user,', user, err);
              return this.authService.refreshToken(user!.refreshToken).pipe(
                switchMap(() => {
                  const updatedRequest = request.clone({
                    setHeaders: {
                      Authorization: `wi-access_token-${user!.token}`,
                    },
                  });
                  return next.handle(updatedRequest);
                }),
                catchError(() => {
                  this.authService.logout();
                  return throwError('Token refresh failed');
                })
              );
            }
            */

            if ([401, 403].includes(err.status) && this.authService.userValue) {
                this.authService.logout();
            }

            console.error(err);
            return throwError(() => err);
        }))
    }
}
