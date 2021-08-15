import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lat2: any  ;
  lng2: any  ;
  lat1: any = 33.5402933858387;
  lng1: any = -7.537258430857849;
  dist: any = 0;
  distKm: any = 0;
  Selectionposition1 = false;
  Selectionposition2 = true;
  // @ts-ignore
  // @ts-ignore


  ngOnInit(): void {
  }
  // @ts-ignore
  map(event): any{
    if (this.Selectionposition1 && !this.Selectionposition2){
      this.lat1 = event.coords.lat;
      this.lng1 = event.coords.lng;
    }
    if (!this.Selectionposition1 && this.Selectionposition2){
      this.lat2 = event.coords.lat;
      this.lng2 = event.coords.lng;
    }
    console.log(event);
    // this.lat1 = event.coords.lat;
    // this.lng1 = event.coords.lng;
    this.distKm = this.nbr_de_chiffres_apres_virgule(this.calcule_distance(this.lat2, this.lng2, this.lat1, this.lng1) , 2) ;
    this.dist = this.nbr_de_chiffres_apres_virgule(this.calcule_distance(this.lat2, this.lng2, this.lat1, this.lng1) * 1000, 2) ;
  }
  // tslint:disable-next-line:variable-name
  calcule_distance(old_lat: any, old_lon: any, new_lat: any, new_lon: any): any {
    let dist = 0;
    // convertion des valeures du degree vers le radian
    const latRad = old_lat * 0.017453293;
    const lonRad = old_lon * 0.017453293;
    const tlatRad = new_lat * 0.017453293;
    const tlonRad = new_lon * 0.017453293;
    //Calcule de la distance en Km
    const latSin = Math.sin((latRad - tlatRad) / 2);
    const lonSin = Math.sin((lonRad - tlonRad) / 2);

    dist = 2 * Math.asin(Math.sqrt((latSin * latSin) + Math.cos(latRad) * Math.cos(tlatRad) * (lonSin * lonSin)));

    dist = dist * 6371; // pour la distance en Km il faut multiplier la valeure trouvée par le rayon de la terre

    return dist;

  }

  SelectPosition1(): any{
    this.Selectionposition1 = true;
    this.Selectionposition2 = false;
  }
  SelectPosition2(): any{
    this.Selectionposition2 = true;
    this.Selectionposition1 = false;
  }
  nbr_de_chiffres_apres_virgule( chiffre: number, nbrApresVirgule: number): number{
    chiffre = (Math.floor(chiffre * Math.pow(10, nbrApresVirgule))) / Math.pow(10, nbrApresVirgule);
    return chiffre;
  }
}
