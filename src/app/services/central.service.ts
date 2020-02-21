import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx' 
import { Observable,from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentralService {
  url = 'http://serveok.herokuapp.com/isup'

  constructor(private http:HTTP) { }

  public serverok():Observable<any>{
    // let results = 
    return from(this.http.get(this.url,{},{'Content-Type':'application/json'})
          .then(Response=>{
            console.log("Success")
            return Response
          })
          .catch(resp =>{   
            console.log("Error");
            return resp;
          })
        )
  }

  // public gps():Observable<any>{

  // }
}
