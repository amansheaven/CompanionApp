import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx'
import { CssSelector } from '@angular/compiler';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { type } from 'os';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {
  private reader : Subscription;
  private nfcobj;

  constructor(private nfc: NFC, private ndef : Ndef, public toastController: ToastController, private vib: Vibration) { }

  ngOnInit(){}
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
      this.presentToast(event.tag.id)
    })

    
  }
  ionViewDidLeave(){
    // console.log(this.reader.type);
    
    this.reader.unsubscribe()
    console.log("Did unsubscribe")
  }

}
