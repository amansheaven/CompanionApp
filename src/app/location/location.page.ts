import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralService } from '../services/central.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude= 28.4569593;
  longitude= 76.9983269;
  state = ""

  constructor(private route: ActivatedRoute, private router:Router, private conn: CentralService) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.longitude =  this.router.getCurrentNavigation().extras.state.longitude
        this.latitude  =  this.router.getCurrentNavigation().extras.state.latitude
      }
    })
  }

  ngOnInit() {
      this.conn.trace(this.latitude,this.longitude)
      .then((resp)=>{
          this.state = resp.data.name;
      })
  }

}
