import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';
import { AuthService } from '@app/_services/auth.service';
import { MonitoringService } from '@app/_services/monitoring.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private monitoringService: MonitoringService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authService.userValue) {
              const c = this.authService.getCredentials();
              if (c.username && c.password) {
                this.authService.login(c.username, c.password)
                    .pipe(
                      first(),
                      switchMap((data) => {
                        const updatedRequest = request.clone({
                          setHeaders: {
                            Authorization: `wi-access_token-${data.token}`,
                          },
                        });
                        return next.handle(updatedRequest);
                      }),
                    )
                    .subscribe({
                        next: (data : any) => {
                          if (data?.body?.list) {
                            this.monitoringService.updateData(data.body.list);
                          }
                        },
                        error: error => {
                            console.error(error);
                        }
                    })
                  ;
              }
            }

            console.error(err);
            return throwError(() => err);
        }))
    }
}
