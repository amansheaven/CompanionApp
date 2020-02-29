import { Component, OnInit } from '@angular/core';
import { QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

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

  constructor(private qrScanner: QRScanner, public qrScanCtrl: QRScanner) { 
  }

  ngOnInit() {

  }

  goToQrScan() {
    this.qrScanCtrl.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.isOn = true;
          // start scanning
          const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.isOn = false;

            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== '') {
              scanSub.unsubscribe();
            }

          });
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
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    window.document.body.style.backgroundColor = 'transparent';
    this.goToQrScan()
    console.log(this.QRSCANNED_DATA);
  }

  ionViewDidLeave(){
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    window.document.body.style.backgroundColor = '#FFF';
    this.closeScanner()
  }

}
