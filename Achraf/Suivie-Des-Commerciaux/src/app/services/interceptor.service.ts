import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{


  public status = true;
  constructor(public loader: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.status){
      this.loader.isLoading.next(true);
      return next.handle(req).pipe(
        finalize(
          () => {
            setTimeout(
              () => {
                this.loader.isLoading.next(false);
              }, 200
            );
          }
        )
      );
    }
    else {
      this.loader.isLoading.next(false);
      return next.handle(req).pipe(
        finalize(
          () => {
            setTimeout(
              () => {
                this.loader.isLoading.next(false);
              }, 200
            );
          }
        )
      );
    }
  }
}
