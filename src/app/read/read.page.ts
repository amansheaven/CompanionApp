import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx'
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

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
  ionViewDidEnter(){

    
    this.nfc.addNdefListener(()=>{
      console.log("READ")},
      (err)=>{
        console.log("Cannot Attach Listened : ",err);
      }
    )
    .subscribe((event) => {
      this.vib.vibrate(100)
      this.presentToast(event.tag.id)
    })

    
  }
  ionViewDidLeave(){
    console.log("OH WE WENT AWAY");
    
  }

}
