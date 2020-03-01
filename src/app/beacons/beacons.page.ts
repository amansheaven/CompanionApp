import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-beacons',
  templateUrl: './beacons.page.html',
  styleUrls: ['./beacons.page.scss'],
})
export class BeaconsPage implements OnInit {

  constructor(private statusBar: StatusBar) { }

  ngOnInit() {
    this.statusBar.overlaysWebView(true)
  }

}
