import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from '../services/central.service';
import { type } from 'os';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude= 28.4569593;
  longitude= 76.9983269;
  public urlbackaddr ;

  constructor(private route: ActivatedRoute, private router:Router, private conn: CentralService) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.longitude =  this.router.getCurrentNavigation().extras.state.longitude
        this.latitude  =  this.router.getCurrentNavigation().extras.state.latitude
      }
    })
  }
  state = {}
  
  ngOnInit() {
    this.conn.trace(this.latitude,this.longitude)
    .then((resp)=>{
        resp = JSON.parse(resp.data)
        this.state = resp;
        console.log(this.state)
        this.urlbackaddr= this.conn.url+this.state['bg']
        console.log(this.urlbackaddr)
    })
    
  }

  moveForward(){
    console.log('goahead')
  }

}
