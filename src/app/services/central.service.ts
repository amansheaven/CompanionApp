import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx' 
import { Observable,from, of } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  private url = 'http://serveok.herokuapp.com/'
  

  constructor(private http:HTTP, private geo:Geolocation) { }

  public serverok(){
    return this.http.get(this.url+'isup',{},{'Content-Type':'application/json'})
  }

  public getloc(){
    return this.geo.getCurrentPosition(
      {maximumAge: 1000, timeout: 5000,
       enableHighAccuracy: true })
  }

  public trace(lati,longi){
    let urli = '192.168.43.92:5000/'
    return this.http.get(urli+'trace',{
      params:{
        lati : [lati.toString()],
        longi : [longi.toString()]        
      }
    },{'Content-Type':'application/json'})
 
    // return of(long, lati)
  }

}
