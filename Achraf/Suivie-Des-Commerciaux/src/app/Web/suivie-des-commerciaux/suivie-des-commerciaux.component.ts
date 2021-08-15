import {Component, OnDestroy, OnInit} from '@angular/core';
import {SuivieService} from '../../services/Suivie.service';
import {InterceptorService} from '../../services/interceptor.service';

@Component({
  selector: 'app-suivie-des-commerciaux',
  templateUrl: './suivie-des-commerciaux.component.html',
  styleUrls: ['./suivie-des-commerciaux.component.css']
})
export class SuivieDesCommerciauxComponent implements OnInit, OnDestroy {
  lat1: any;
  lng1: any;
  variable = true;
  // @ts-ignore
  allComplete = false;
  latitude: any = 33.585613610562106;
  longitude: any = -7.616541031414683;


  constructor(public suivie: SuivieService, public interceptorService: InterceptorService) { }

  ngOnInit(): void {
    this.suivie.getCommerciauxPrincipaux();
    this.suivie.getCommerciaux();

    this.suivie.statuss = true;
    setTimeout(() => {
      this.interceptorService.status = false;
      console.log(this.suivie.commerciauxpraincipaux);
    }, 100);
    // this.interceptorService.status = false;
  }
  setAll(commercial: boolean): any{
    if (this.suivie.commerciauxListASuivre.length === 0){
      this.suivie.commerciaux = [];
    }
    // @ts-ignore
    commercial.status = !commercial.status;
    // @ts-ignore
    if (!commercial.status){
      // @ts-ignore
      this.suivie.commerciauxListASuivre = this.ajouter(this.suivie.commerciauxListASuivre, commercial.id_commercial);
      console.log(this.suivie.commerciauxListASuivre);
    }
    else {
      // @ts-ignore
      this.suivie.commerciauxListASuivre =  this.suivie.commerciauxListASuivre.filter(comm => (comm !== commercial.id_commercial));
      // @ts-ignore
      this.suivie.commerciaux =  this.suivie.commerciaux.filter(comm => (comm.id_commercial !== commercial.id_commercial));
      this.retirer( this.suivie.commerciauxListASuivre);
      console.log(this.suivie.commerciauxListASuivre);

    }
  }
  annulerSuivie(): any{
    // @ts-ignore
    this.suivie.commerciauxpraincipaux.map(comm => comm.status = true);
    this.suivie.commerciauxListASuivre = [];
    this.variable = false;

  }
  getcommercial(value: any): any{ }
  ajouter(list: any, n: number): any{
      let i = 0;
      for (const comm of list){ if (n === comm){ i += 1; }}
      if (i === 0){list.push(n); }
      this.variable = true;
      return list;
    }
  retirer(list: any ): any{
      if (list.length === 0){this.variable = false; }
      else {this.variable = true; }
     }

  nggOnDestroy(): void {
    this.suivie.locationsSubscription.unsubscribe();
    // this.timer.dispose();
    this.suivie.statuss = !this.suivie.statuss;
    // this.interceptorService.status = true;

  }

  ngOnDestroy(): void {
    this.suivie.statuss = false;
    window.location.reload();

  }

}
