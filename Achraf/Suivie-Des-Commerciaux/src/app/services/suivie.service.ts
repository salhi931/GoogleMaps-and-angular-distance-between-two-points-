import {Observable, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InterceptorService} from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class SuivieService implements OnDestroy{
  commerciaux: any = [];
  commerciauxListASuivre: any =  [];
  commerciauxpraincipaux: any = [];
  statuss = true;
  // @ts-ignore
  locationsSubscription: Subscription;
  latitude: any = 33.585613610562106;
  longitude: any = -7.616541031414683;

  constructor(private http: HttpClient, public interceptorService: InterceptorService) {
  }
  getCommerciaux(): any{
    this.interceptorService.status = false;
    const locations = new Observable((observer) => {


      setInterval(() => {
        console.log(this.commerciauxListASuivre.size);
        if (this.statuss  ){
          this.http
            .get(environment.HTTP + 'SuivieCommerciaux/' + this.commerciauxListASuivre)
            .subscribe(data => {
              this.commerciaux = data;
              console.log(this.commerciaux);
              if (this.commerciaux.length === 1){
                this.latitude = this.commerciaux[0].latcurrent;
                this.longitude = this.commerciaux[0].lngcurrent;
                console.log(this.latitude, this.longitude);

              }
              else{
                this.latitude = 33.585613610562106;
                this.longitude = -7.616541031414683;
              }
              observer.next(this.commerciaux);

            }, error => {observer.error(error); });
        }

      }, 10000);
    });
    this.locationsSubscription = locations.subscribe({
      // tslint:disable-next-line:typedef
      next(position) {
        console.log('Current Position: ', position);
      },
      // tslint:disable-next-line:typedef
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });

  }
  getCommerciauxPrincipaux(): any{
    this.http
      .get(environment.HTTP + 'Commerciaux')
      .subscribe(data => {
        this.commerciauxpraincipaux = data;
        console.log(this.commerciauxpraincipaux);
       }, error => {console.log(error); });
  }
// tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.statuss = false;
    this.locationsSubscription.unsubscribe();
  }
}
