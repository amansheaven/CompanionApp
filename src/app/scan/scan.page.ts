import { Component, OnInit } from '@angular/core';
import { QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};

  constructor(private statusBar: StatusBar,private qrScanner: QRScanner, public qrScanCtrl: QRScanner, public toastController: ToastController, private vib: Vibration,public navc: Router) { 
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

  ngOnInit() {
    this.statusBar.overlaysWebView(true)
  }

  goToQrScan() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    window.document.body.style.backgroundColor = 'transparent';
    this.qrScanCtrl.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.isOn = true;
          // start scanning
          this.qrScanCtrl.show();

        } else if (status.denied) {
          console.log('camera permission denied');
          this.qrScanCtrl.openSettings();
        } else {
        }
      })
      .catch((e: any) => console.log('Error is', e)); 
  }

  closeScanner() {
    this.isOn = false;
    this.qrScanCtrl.hide();
    this.qrScanCtrl.destroy();
  }




  ionViewDidEnter(){
    this.goToQrScan()
    let scanlisten = this.qrScanCtrl.scan()
  }

  ionViewDidLeave(){
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    window.document.body.style.backgroundColor = '#FFF';
    this.closeScanner()
  }

}
