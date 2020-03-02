import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CentralService } from '../services/central.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { resolve } from 'url';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public data;
  public info;
  public url = this.conn.url+'static/'
  public final_con;
  // public url = 

  constructor(private navc: Router, private route: ActivatedRoute, private conn: CentralService, private statusBar : StatusBar,public toastController: ToastController, public alertController: AlertController) {
    // PROD SCRIPT
    this.final_con = this.conn.product_find
    this.route.queryParams.subscribe(params => {
      if(this.navc.getCurrentNavigation().extras.state) {
        this.data =  this.navc.getCurrentNavigation().extras.state.id
        this.info = this.navc.getCurrentNavigation().extras.state.data
        this.info = JSON.parse(this.info.data)
        this.info = this.info.product
        console.log(this.info)
        console.log("THIS")
      }
    })

    

    this.statusBar.overlaysWebView(true)

    // this.data = 1001
    // this.info = {
    //   "product": {
    //     "availability": [
          
    //     ], 
    //     "choice": [
          
    //     ], 
    //     "img": "", 
    //     "name": "", 
    //     "price": 0, 
    //     "similar": [
    //       0, 
    //       0, 
    //       0
    //     ],
    //     "desp":"",
    //   }, 
    //   "status": 0
    // }


   }

   async presentToast(string) {
    const toast = await this.toastController.create({
      message: string,
      duration: 2000,
      color: 'light',
      position: 'top',
      cssClass: 'toaster',
      animated: true,
    });
    toast.present();
  }

  async presentAlertg() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Wait till genie arrives near the product.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertb() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Added to your wishlist',
      buttons: ['OK']
    });
    await alert.present();
  }


   similar(item){
      this.presentToast(item).then(()=>{
        this.presentToast("Called new page")
        let passing : NavigationExtras = {
          state: {
            id:item
          }
        }
        this.navc.navigate(['/product'],passing)
      })
   }

   ngOnInit() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    window.document.body.style.backgroundColor = '#FFF';


    // return new Promise((resolve,reject)=>{
    //   this.final_con(this.data).then((res)=>{
    //     this.info = res.data
    //     console.log("HERE BOI");
        
    //     console.log(this.info)
    //     resolve(this.info)
    //   })
    // })

    // PROD SCRIPT
    // this.conn.product_find(this.data).then((res)=>{
    //   // this.data = JSON.parse(res.data)
    //   this.info = res.data
    //   console.log(this.info)
    // })

    //static entry for testing
    // this.data = 1001
    // this.info = {
    //   "product": {
    //     "availability": [
    //       "DEF002", 
    //       "DEL003", 
    //       "BNG004", 
    //       "DEL009"
    //     ], 
    //     "choice": [
    //       "Red Keys", 
    //       "Green Keys", 
    //       "White Keys"
    //     ], 
    //     "img": "1001.jpg", 
    //     "name": "Red Gear K320 Keyboard", 
    //     "price": 1800, 
    //     "similar": [
    //       1002, 
    //       1003, 
    //       1004
    //     ],
    //     "desp":" This keyboard is mechenical",
    //   }, 
    //   "status": 200
    // }
    
    // console.log(this.info.product);
    
    // this.info = this.info.data.product


  }

  ionViewWillEnter(){

  }

  ionViewDidEnter(){
    console.log("Entered ...")
  }

}
