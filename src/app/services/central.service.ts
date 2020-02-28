import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx' 
import { Observable,from, of } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  // private url = 'http://serveok.herokuapp.com/'
  public url = 'http://192.168.43.92:5000/'
  

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
     // testing api for prod use private url in constructor
    let finurl = this.url+'trace?longi='+longi.toString()+'&lati='+lati.toString()
    console.log(finurl)
    return this.http.get(finurl,{},{'Content-Type':'application/json'})
    // return of(long, lati)
  }

}
