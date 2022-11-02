import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.presentLoading();

    return next.handle(request).pipe(
          finalize(() => this.loaderService.cerrar()),
    );
 }

}

