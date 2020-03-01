import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public data;

  constructor(private navc: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if(this.navc.getCurrentNavigation().extras.state) {
        this.data =  this.navc.getCurrentNavigation().extras.state.id
      }
    })

    

   }

  ngOnInit() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    window.document.body.style.backgroundColor = '#FFF';
  }

}
