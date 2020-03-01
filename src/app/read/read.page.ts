import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { CentralService } from '../services/central.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {
  private reader : Subscription;
  private nfcobj;

  constructor(private statusBar: StatusBar,private nfc: NFC, private ndef : Ndef, public toastController: ToastController, private vib: Vibration, private conn: CentralService, private navc: Router) { }

  ngOnInit(){
    this.statusBar.overlaysWebView(true)
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

  ionViewWillEnter(){
        
    this.nfcobj = this.nfc.addNdefListener(()=>{
      console.log("Reading")},
      (err)=>{
        console.log("Cannot Attach Listened : ",err);
      }
    )
  }
  ionViewDidEnter(){

    this.reader = this.nfcobj.subscribe((event) => {
      this.vib.vibrate(100)
      // this.presentToast(event.tag.id)
      let payload = event.tag.ndefMessage[0].payload;
      let tagContent = this.nfc.bytesToString(payload)

      this.presentToast(tagContent.substr(3))
      .then(()=>{
        let passing : NavigationExtras = {
          state: {
            id:tagContent.substr(3)
          }
        }
        this.navc.navigate(['/product'],passing)
      })
      
    })

    
  }
  ionViewDidLeave(){
    // console.log(this.reader.type);
    
    this.reader.unsubscribe()
    console.log("Did unsubscribe")
  }

}
