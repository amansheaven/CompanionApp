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
    console.log("doin it")
    return from(this.http.get(this.url,{},{'Content-Type':'application/json'})
          .then(Response=>{
            console.log("After Promise")
            console.log(Response)
            return Response
          })
          .catch(resp =>{   
            console.log("err:catch");
            console.log(resp)
            return resp;
          })
        )
  }
}
